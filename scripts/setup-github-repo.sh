#!/usr/bin/env bash
set -euo pipefail

REPO="${1:-filippocasta-sudo/cv-app}"

echo "==> Configurazione repository: $REPO"
echo "    Richiede gh autenticato con permessi admin sul repository."
echo

apply_branch_protection() {
  local branch="$1"
  local review_count="$2"

  echo "==> Protezione branch: $branch"
  gh api "repos/${REPO}/branches/${branch}/protection" -X PUT \
    --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "checks": [
      {
        "context": "CI"
      }
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false,
    "required_approving_review_count": ${review_count}
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true
}
EOF
}

echo "==> Imposto 'dev' come branch predefinito"
gh repo edit "$REPO" --default-branch dev

apply_branch_protection "dev" 0
apply_branch_protection "prod" 0

echo "==> Elimino branch main (remoto e locale)"
git push origin --delete main || true
git branch -D main 2>/dev/null || true

echo
echo "Configurazione completata."
echo "- Branch predefinito: dev"
echo "- Protezione attiva su: dev, prod"
echo "- Branch main eliminato"
echo
echo "Verifica su GitHub: https://github.com/${REPO}/settings/branches"
