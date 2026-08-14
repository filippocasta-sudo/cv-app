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
| `BLOB_READ_WRITE_TOKEN` | Sì su Vercel | Iniettata automaticamente quando un Blob store è collegato al progetto. Abilita il salvataggio dei contenuti in produzione. |
| `ADMIN_SESSION_SECRET` | No | Chiave aggiuntiva per la firma del cookie di sessione. |
| `CV_DATA_FILE` | No | Percorso del JSON usato dal driver su filesystem. Default `data/cv-content.json`. |
| `NEXT_PUBLIC_SITE_URL` | No | Origine pubblica per canonical, Open Graph, `robots.txt` e `sitemap.xml`. Su Vercel viene ricavata da `VERCEL_PROJECT_PRODUCTION_URL`; serve solo per sovrascriverla. |

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

`src/data/cvData.ts` è il dataset di fallback, versionato con il codice: viene servito finché non
esiste un contenuto salvato, oppure se il payload salvato è illeggibile.

Il salvataggio usa il driver adatto all'ambiente, scelto automaticamente:

| Ambiente | Driver | Dove finiscono i dati |
| --- | --- | --- |
| Locale e self-hosted | File JSON | `data/cv-content.json`, escluso dal versionamento |
| Vercel | Vercel Blob | Oggetto privato `cv/content.json` nel Blob store del progetto |

Il driver Blob entra in funzione quando è presente `BLOB_READ_WRITE_TOKEN`. Le letture usano
`useCache: false`: sovrascrivere lo stesso percorso servirebbe altrimenti la copia in CDN fino a
60 secondi, e una modifica dal pannello admin non sarebbe visibile subito.

Il pannello admin mostra sempre quale storage è attivo. Se non è scrivibile, i pulsanti di
salvataggio sono disabilitati con la spiegazione di cosa manca, invece di far perdere le modifiche.

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

## Branch e CI

Il repository usa `dev` per lo sviluppo e `prod` per la produzione, entrambi protetti da regole che
richiedono pull request e check `CI` verde. Il workflow `.github/workflows/ci-cd.yml` esegue lint,
type check e build: è il gate di qualità prima del merge.

## Deploy su Vercel

Il deploy è gestito dalla Git integration di Vercel, non da GitHub Actions: i push su `prod`
diventano deployment di produzione, ogni altro branch e ogni pull request ottiene un preview.

Setup iniziale del progetto:

1. **Crea il progetto**: su [vercel.com/new](https://vercel.com/new) importa il repository
   `cv-app`. Vercel riconosce Next.js da solo, non serve modificare build command o output
   directory.
2. **Imposta il branch di produzione**: Settings → Environments → Production → Branch Tracking,
   inserisci `prod` e salva. Senza questo passaggio Vercel usa il branch predefinito del
   repository, che qui è `dev`.
3. **Collega un Blob store**: Storage → Create Database → Blob, poi collegalo al progetto. Vercel
   inietta `BLOB_READ_WRITE_TOKEN` in tutti gli ambienti e il salvataggio dei contenuti si attiva.
4. **Aggiungi `ADMIN_PASSWORD`**: Settings → Environment Variables, valore a tua scelta, per gli
   ambienti Production, Preview e Development.
5. **Fai il primo deploy**: il merge su `prod` pubblica la versione di produzione.

Opzionale ma consigliato per un pubblico italiano: Settings → Functions → Region, imposta
Frankfurt (`fra1`) per ridurre la latenza rispetto al default statunitense.

### Dominio pubblico

Il dominio di produzione va aggiunto in Settings → Domains. Vercel considera canonico solo un
dominio aggiunto esplicitamente: gli URL generati automaticamente (`<progetto>-<scope>.vercel.app` e
quelli per singolo deployment) vengono serviti con `X-Robots-Tag: noindex`, quindi non finiscono nei
risultati di ricerca.

L'applicazione ricava l'origine pubblica da `VERCEL_PROJECT_PRODUCTION_URL`, che Vercel imposta
sempre con il dominio di produzione più corto, anche nei deployment di preview. Canonical, Open
Graph, `robots.txt` e `sitemap.xml` puntano quindi alla produzione senza configurazione manuale.

Per cambiare il sottodominio `.vercel.app` generato serve rinominare il progetto in Settings →
General: gli indirizzi `.vercel.app` sono assegnati in ordine di arrivo e non si possono riservare.

Nota sui preview: i deployment di preview condividono lo stesso Blob store della produzione, quindi
una modifica salvata da un preview cambia anche i contenuti pubblici. Per tenerli separati serve un
secondo Blob store collegato solo all'ambiente Preview.
