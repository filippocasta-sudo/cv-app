# cv-app

CV interattivo di Filippo Castagna: Single Page Application in Next.js con doppia modalità di
lettura (versione schietta / CV formale classico) e pannello admin protetto per la gestione dei
contenuti.

## Stack

| Tecnologia | Uso |
| --- | --- |
| Next.js 16 (App Router) | Rendering server, route handler API |
| React 19 + TypeScript | Componenti e tipizzazione del modello dati |
| Tailwind CSS 4 | Design system via CSS custom properties |
| framer-motion | Micro-animazioni di accordion e transizioni di stato |
| lucide-react | Set di icone |

Tipografia: **Syne** per titoli e headings, **Atkinson Hyperlegible** per i testi.

## Avvio in locale

```bash
npm install
cp .env.example .env.local   # imposta ADMIN_PASSWORD
npm run dev
```

L'applicazione risponde su http://localhost:3000.

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Sì (per l'admin) | Password di accesso a `/admin`. Senza questa variabile il pannello resta inaccessibile. |
| `ADMIN_SESSION_SECRET` | No | Chiave aggiuntiva per la firma del cookie di sessione. |
| `CV_DATA_FILE` | No | Percorso del JSON dei contenuti. Default `data/cv-content.json`. Su filesystem in sola lettura puntare a una directory scrivibile (es. `/tmp/cv-content.json`). |

## Pannello admin

Tre modi per accedere:

1. Visitare direttamente `/admin`
2. Scorciatoia da tastiera `Ctrl` + `Shift` + `A`
3. Tre click rapidi sul marcatore a fine footer

Il pannello permette CRUD completo su timeline (esperienze, formazione, progetti), hard e soft
skills, certificazioni, obiettivi di carriera, matrice "so fare / non so fare", RAL desiderata,
dati personali e link social. Il pulsante **Ripristina** riporta i contenuti a quelli di
`src/data/cvData.ts`.

## Persistenza dei contenuti

- `src/data/cvData.ts` è il dataset di fallback, versionato con il codice.
- Le modifiche fatte dall'admin vengono scritte in `data/cv-content.json`, che è escluso dal
  versionamento perché rappresenta stato runtime.
- Se il file non esiste o è malformato, l'applicazione usa il fallback senza errori.

## Modalità di lettura

- **Versione schietta**: testi diretti, sezioni compatte con progressive disclosure e filtri
  sulla timeline.
- **CV formale classico**: testi formali, tutte le sezioni espanse e stili ottimizzati per la
  stampa o l'esportazione in PDF tramite il pulsante di stampa nell'header.

## Comandi

```bash
npm run dev     # sviluppo
npm run build   # build di produzione
npm start       # avvio del build
npm run lint    # ESLint
npx tsc --noEmit  # type-check
```

## Struttura

```
src/
  app/            route App Router e API (auth, cv, contact)
  components/     UI pubblica e pannello admin
  context/        preferenze tema e modalità di lettura
  data/           dataset di fallback del CV
  lib/            tipi, persistenza JSON, autenticazione
```

## Branch e deploy

Il repository usa `dev` per lo sviluppo e `prod` per la produzione, entrambi protetti da regole
che richiedono pull request e check CI verde. La pipeline in `.github/workflows/ci-cd.yml`
esegue la CI sulle pull request e i job di deploy sui push ai rispettivi branch.
