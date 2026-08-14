import type { CvData } from "@/lib/types";

export const cvData: CvData = {
  personal: {
    name: "Filippo Castagna",
    roles: ["IT Omnichannel Delivery Specialist", "IT Project Coordinator"],
    statusBadge: "Attualmente in Calzedonia S.p.A.",
    intro:
      "Faccio arrivare in produzione le cose che gli altri si limitano a mettere in roadmap. Vengo dall'assistenza applicativa e dall'e-commerce omnicanale: ho imparato a leggere un errore in coda, capire quanto costa al business e decidere cosa si sistema adesso e cosa può aspettare lunedì. Parlo con gli sviluppatori senza tradurre e con il business senza spaventarlo.",
    formalIntro:
      "Professionista IT con oltre cinque anni di esperienza nel coordinamento di progetti e servizi applicativi in ambito e-commerce omnicanale. Specializzato nella gestione di team distribuiti, nella governance di servizi AMS in ottica ITIL e nel raccordo tra esigenze di business e implementazione tecnica. Attualmente impiegato presso Calzedonia S.p.A. con responsabilità di delivery su piattaforme omnicanale.",
    email: "filippocasta@gmail.com",
    phone: "+39 349 000 0000",
    linkedin: "https://www.linkedin.com/in/filippo-castagna-9220/",
    location: "Tregnago (VR), Italia",
    license: "Patente B — automunito",
    birthDate: "1992",
    languages: [
      { name: "Italiano", level: "Madrelingua" },
      { name: "Inglese", level: "B2" },
      { name: "Francese", level: "B1" },
    ],
  },

  goals: {
    headline:
      "Voglio smettere di essere quello che tiene in piedi il servizio e diventare quello che decide cosa costruire.",
    targetRoles: [
      "Senior Project Manager",
      "Lead Functional Analyst",
      "Product Owner",
      "IT Delivery Manager",
    ],
    projectTypes: [
      "Progetti omnicanale end-to-end: store, e-commerce, logistica e CRM che devono parlarsi davvero",
      "Riprogettazione di processi che oggi stanno in piedi solo grazie a Excel e buona volontà",
      "Rollout internazionali con più fornitori e più fusi orari da tenere allineati",
      "Passaggi da AMS reattivo a servizio governato con SLA e metriche che qualcuno legge",
    ],
    idealContext: [
      "Aziende prodotto o retail con volumi reali, dove una scelta sbagliata si vede subito a scaffale",
      "Management che dà autonomia sulle priorità e chiede conto dei risultati, non delle ore",
      "Team dove il PM è dentro le decisioni tecniche, non un passacarte tra ticket e stakeholder",
      "Ibrido serio: presenza quando serve allineare persone, remoto quando serve solo concentrarsi",
    ],
  },

  hardSkills: [
    {
      id: "hs-pm",
      name: "Project & Delivery Management",
      summary:
        "Pianificazione, avanzamento e messa in produzione di rilasci con più fornitori coinvolti.",
      details: [
        "Gestione di backlog e priorità con criteri di impatto sul business",
        "Pianificazione di rilasci coordinati tra team interni e partner esterni",
        "Stesura di documentazione funzionale, analisi e verbali di allineamento",
        "Metodologie predittive e agili applicate in base al contesto, non per dogma",
      ],
    },
    {
      id: "hs-omnichannel",
      name: "E-commerce & Omnichannel",
      summary:
        "Flussi ordine, stock, resi e integrazioni tra canale online, punto vendita e logistica.",
      details: [
        "Order management: ship-from-store, click&collect, resi cross-canale",
        "Sincronizzazione stock tra magazzini, negozi e piattaforma di vendita",
        "Analisi di anomalie su flussi ordine con impatto diretto sul cliente finale",
        "Interfacciamento con sistemi di pagamento e provider logistici",
      ],
    },
    {
      id: "hs-salesforce",
      name: "Salesforce Cloud",
      summary:
        "Configurazione e presidio funzionale su ecosistema Salesforce lato commerce e service.",
      details: [
        "Service Cloud: gestione case, code, regole di assegnazione",
        "Commerce Cloud: presidio funzionale su catalogo e processi d'ordine",
        "Definizione di report e dashboard per il monitoraggio del servizio",
        "Raccordo con i team di sviluppo su customizzazioni e integrazioni",
      ],
    },
    {
      id: "hs-atlassian",
      name: "Atlassian Suite",
      summary:
        "Jira, Jira Service Management e Confluence usati come strumenti di governo, non come archivio.",
      details: [
        "Disegno di workflow, schemi di priorità e automazioni in Jira",
        "Configurazione di portali e SLA in Jira Service Management",
        "Strutturazione della knowledge base in Confluence",
        "Reportistica su ciclo di vita dei ticket e rispetto degli SLA",
      ],
    },
    {
      id: "hs-ams",
      name: "AMS & ITIL",
      summary:
        "Governo di servizi di manutenzione applicativa: incident, problem e change management.",
      details: [
        "Gestione incident con classificazione per severità e impatto",
        "Problem management: analisi delle cause ricorrenti e rimozione alla radice",
        "Change management e finestre di rilascio concordate con il business",
        "Definizione e monitoraggio di SLA e KPI di servizio",
      ],
    },
    {
      id: "hs-tech",
      name: "Basi tecniche & Dati",
      summary:
        "SQL e linguaggi di programmazione: abbastanza per leggere il codice, capire il problema e non farmi raccontare storie.",
      details: [
        "SQL: query di analisi, verifica dati, riconciliazione flussi",
        "Java — base solida da percorso di studi",
        "Python — scripting e automazioni di supporto",
        "C / C++ — fondamenti algoritmici dal percorso universitario",
        "HTML, CSS, JavaScript — lettura e modifica di interfacce esistenti",
        "Excel avanzato: pivot, lookup, modelli di controllo dati",
        "Postman e strumenti di test API per verifica integrazioni",
      ],
    },
  ],

  softSkills: [
    {
      id: "ss-coordination",
      name: "Coordinamento team distribuiti",
      summary:
        "Tengo allineate persone che non condividono ufficio, lingua né fuso orario.",
      details: [
        "Gestione di fornitori esterni con obiettivi e scadenze condivise",
        "Riunioni corte con decisioni scritte: chi fa cosa ed entro quando",
        "Escalation gestite prima che diventino problemi politici",
      ],
    },
    {
      id: "ss-bridge",
      name: "Ponte Business / Sviluppo",
      summary:
        "Traduco richieste di business in requisiti implementabili e vincoli tecnici in scelte comprensibili.",
      details: [
        "Raccolta e sfida dei requisiti: prima capisco il problema, poi scrivo la soluzione",
        "Riformulazione dei vincoli tecnici in impatti concreti su tempi e costi",
        "Documentazione funzionale utilizzabile sia da chi sviluppa sia da chi collauda",
      ],
    },
    {
      id: "ss-priority",
      name: "Gestione priorità sotto pressione",
      summary:
        "Con dieci urgenze contemporanee decido quali due contano davvero e lo comunico chiaramente.",
      details: [
        "Valutazione rapida dell'impatto economico e reputazionale di un incident",
        "Comunicazione trasparente su cosa non verrà fatto e perché",
        "Tenuta nei picchi: campagne, Black Friday, rilasci critici",
      ],
    },
    {
      id: "ss-pragmatism",
      name: "Pragmatismo e trasparenza",
      summary:
        "Preferisco una brutta notizia in anticipo a una bella sorpresa mai arrivata.",
      details: [
        "Stime dichiarate con margine di incertezza, non con ottimismo",
        "Ammissione rapida degli errori e correzione senza cercare colpevoli",
        "Decisioni documentate per non ridiscutere le stesse cose ogni mese",
      ],
    },
  ],

  certifications: [
    {
      id: "cert-pmi-agile",
      name: "PMI Agile Project Management",
      issuer: "Project Management Institute",
      year: "2026",
      primary: true,
      note: "Gestione iterativa, backlog e cadenze di delivery",
    },
    {
      id: "cert-pmi-predictive",
      name: "PMI Predictive Project Management",
      issuer: "Project Management Institute",
      year: "2026",
      primary: true,
      note: "Pianificazione, WBS, controllo scope e costi",
    },
    {
      id: "cert-jsm",
      name: "Atlassian Jira Service Management Badge",
      issuer: "Atlassian",
      year: "2023",
      primary: true,
    },
    {
      id: "cert-jira",
      name: "Atlassian Jira Fundamentals Badge",
      issuer: "Atlassian",
      year: "2022",
      primary: true,
    },
    {
      id: "cert-google",
      name: "Google Digital Training",
      issuer: "Google",
      year: "2020",
      primary: false,
      note: "Fondamenti di marketing digitale e analytics",
    },
    {
      id: "cert-english-london",
      name: "English Course — Londra",
      issuer: "Soggiorno studio",
      year: "2018",
      primary: false,
      note: "Corso intensivo con full immersion linguistica",
    },
    {
      id: "cert-excel",
      name: "Excel avanzato per l'analisi dati",
      issuer: "Formazione aziendale",
      year: "2021",
      primary: false,
    },
  ],

  canDo: [
    {
      id: "can-1",
      label: "Portare un progetto in produzione",
      detail:
        "Dal requisito confuso al rilascio verificato, tenendo insieme fornitori, test e comunicazione.",
    },
    {
      id: "can-2",
      label: "Tradurre business e tecnica",
      detail:
        "Sto in mezzo senza fare il postino: sfido le richieste e riporto i vincoli con numeri.",
    },
    {
      id: "can-3",
      label: "Governare un servizio AMS",
      detail:
        "Incident, problem e change con SLA misurati e cause ricorrenti rimosse, non solo tamponate.",
    },
    {
      id: "can-4",
      label: "Decidere sotto pressione",
      detail:
        "Nei picchi scelgo cosa salvare per primo e mi prendo la responsabilità della scelta.",
    },
    {
      id: "can-5",
      label: "Leggere dati e codice",
      detail:
        "Query SQL, log e API: verifico da solo prima di aprire un ticket a qualcun altro.",
    },
    {
      id: "can-6",
      label: "Scrivere documentazione usabile",
      detail:
        "Analisi funzionali che chi sviluppa legge davvero e chi collauda riesce a usare.",
    },
  ],

  cannotDo: [
    {
      id: "cannot-1",
      label: "Micro-management",
      detail:
        "Non controllo le persone ora per ora. Se serve quello, non sono la scelta giusta.",
    },
    {
      id: "cannot-2",
      label: "Grafica e UI design avanzato",
      detail:
        "Riconosco un'interfaccia sbagliata, ma il design lo lascio a chi lo fa di mestiere.",
    },
    {
      id: "cannot-3",
      label: "Sviluppo full-time senior",
      detail:
        "Leggo e modifico codice, non mi spaccio per sviluppatore di prodotto a tempo pieno.",
    },
    {
      id: "cannot-4",
      label: "Data science e modelli ML",
      detail:
        "So leggere i dati e costruire report, non addestrare modelli predittivi.",
    },
    {
      id: "cannot-5",
      label: "Promettere date che non tengono",
      detail:
        "Non dico sì a una scadenza per far contenta la stanza e litigare due mesi dopo.",
    },
    {
      id: "cannot-6",
      label: "Sistemi legacy mainframe",
      detail:
        "Mai lavorato su COBOL o AS/400: partirei da zero e lo dico prima, non dopo la firma.",
    },
  ],

  compensation: {
    label: "RAL desiderata",
    range: "50.000 € – 60.000 €",
    note: "Valutabile in base a ruolo, autonomia decisionale e livello di responsabilità sul delivery.",
  },

  timeline: [
    {
      id: "tl-calzedonia-delivery",
      kind: "work",
      title: "IT Omnichannel Delivery Specialist",
      organization: "Calzedonia S.p.A.",
      period: "Feb 2026 — Oggi",
      sortKey: 202602,
      current: true,
      location: "Verona",
      impact:
        "Passato dal presidiare il servizio esistente al portare in produzione nuove funzionalità omnicanale su più mercati.",
      context: [
        "Coordinamento del delivery di evolutive sui flussi omnicanale tra e-commerce, punto vendita e logistica",
        "Raccolta e formalizzazione dei requisiti con i referenti di business dei diversi paesi",
        "Pianificazione dei rilasci con team di sviluppo interni e partner esterni",
        "Presidio dei collaudi funzionali prima del passaggio in produzione",
      ],
      learned: [
        "Un requisito accettato senza discuterlo diventa un problema del delivery, non di chi l'ha scritto",
        "La differenza tra un rilascio riuscito e uno disastroso sta quasi sempre nella preparazione del collaudo",
      ],
      formalSummary:
        "Responsabile del delivery di iniziative omnicanale: raccolta requisiti, pianificazione rilasci, coordinamento fornitori e presidio dei collaudi funzionali su più mercati.",
      tags: ["Delivery", "Omnichannel", "Salesforce", "Jira"],
    },
    {
      id: "tl-calzedonia-ams",
      kind: "work",
      title: "IT Omnichannel AMS Coordinator",
      organization: "Calzedonia S.p.A.",
      period: "Lug 2020 — Gen 2026",
      sortKey: 202007,
      location: "Verona",
      impact:
        "Trasformato un supporto applicativo reattivo in un servizio governato con SLA misurati e cause ricorrenti rimosse alla radice.",
      context: [
        "Coordinamento del servizio di manutenzione applicativa sui sistemi omnicanale",
        "Gestione di incident e problem management con classificazione per impatto e severità",
        "Governo di fornitori esterni e team distribuiti su fusi orari differenti",
        "Configurazione di workflow, SLA e automazioni in Jira Service Management",
        "Reportistica periodica sull'andamento del servizio verso il management",
      ],
      learned: [
        "Chiudere ticket velocemente non è un risultato: il risultato è che quel ticket non torni più",
        "Nei picchi di campagna la priorità va decisa in anticipo, non improvvisata durante l'incident",
        "Un fornitore rende quanto è chiaro il perimetro che gli hai dato",
      ],
      formalSummary:
        "Coordinamento del servizio AMS su piattaforme omnicanale in ottica ITIL: incident e problem management, governance fornitori, definizione SLA e reportistica di servizio.",
      tags: ["AMS", "ITIL", "Salesforce", "Jira Service Management", "SQL"],
    },
    {
      id: "tl-brennero",
      kind: "work",
      title: "Stagista Ufficio IT",
      organization: "Autostrade del Brennero S.p.A.",
      period: "Set 2019 — Dic 2019",
      sortKey: 201909,
      location: "Trento",
      impact:
        "Primo contatto con un'infrastruttura IT aziendale reale e con la distanza tra teoria universitaria e operatività.",
      context: [
        "Supporto all'ufficio IT su attività di gestione e manutenzione dei sistemi interni",
        "Assistenza agli utenti su postazioni, applicativi e periferiche",
        "Documentazione delle attività e delle configurazioni",
      ],
      learned: [
        "In azienda il problema dell'utente conta più dell'eleganza della soluzione",
        "Chiedere prima di toccare un sistema in produzione è una competenza, non timidezza",
      ],
      formalSummary:
        "Stage presso l'ufficio IT con attività di supporto sistemistico, assistenza agli utenti interni e documentazione tecnica.",
      tags: ["IT Support", "Infrastruttura"],
    },
    {
      id: "tl-ristorazione",
      kind: "work",
      title: "Pizzaiolo / Cameriere",
      organization: "Ristorazione e pizzeria",
      period: "2010 — 2021",
      sortKey: 201001,
      location: "Provincia di Verona",
      impact:
        "Undici anni di weekend in servizio: qui ho imparato la gestione dello stress e del lavoro di squadra molto prima di leggerla in un manuale di project management.",
      context: [
        "Gestione del banco e della sala nei picchi serali e nei fine settimana",
        "Coordinamento con cucina e sala per tenere i tempi di uscita dei piatti",
        "Rapporto diretto con il cliente, incluse le lamentele da gestire sul momento",
      ],
      learned: [
        "Quando arrivano trenta ordini insieme, la sequenza conta più della velocità",
        "Un cliente arrabbiato si recupera con trasparenza e tempi certi, non con scuse generiche",
        "Una squadra che si copre le spalle regge un sabato sera; una fatta di individualisti no",
      ],
      formalSummary:
        "Attività di ristorazione con mansioni di preparazione e servizio, gestione del cliente e coordinamento operativo nei periodi di massima affluenza.",
      tags: ["Gestione stress", "Teamwork", "Customer facing"],
    },
    {
      id: "tl-cv-app",
      kind: "project",
      title: "CV interattivo self-hosted",
      organization: "Progetto personale",
      period: "2026",
      sortKey: 202601,
      impact:
        "Costruito questo CV come applicazione Next.js con pannello di amministrazione, per aggiornare i contenuti senza toccare il codice.",
      context: [
        "Single Page Application in Next.js con App Router, TypeScript e Tailwind CSS",
        "Pannello admin protetto con CRUD completo su timeline, competenze e obiettivi",
        "Persistenza dei contenuti tramite API route e archivio JSON",
        "Doppia modalità di lettura: versione schietta e CV formale stampabile",
      ],
      learned: [
        "Scrivere di sé in modo diretto è più difficile che scrivere un'analisi funzionale",
        "Un CMS minimo ma reale vale più di un contenuto perfetto scolpito nel codice",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "tl-automation",
      kind: "project",
      title: "Automazioni di reportistica AMS",
      organization: "Progetto personale applicato al lavoro",
      period: "2023",
      sortKey: 202301,
      impact:
        "Ridotto il tempo di preparazione del reporting mensile di servizio da mezza giornata a pochi minuti.",
      context: [
        "Script Python ed export SQL per aggregare i dati dei ticket",
        "Modelli Excel con pivot e controlli automatici sulla coerenza dei dati",
        "Standardizzazione del formato di reporting verso il management",
      ],
      learned: [
        "Automatizzare un report obbliga a definire cosa si sta misurando davvero",
        "Il tempo risparmiato ogni mese va reinvestito nell'analisi, non in altri report",
      ],
      tags: ["Python", "SQL", "Excel"],
    },
    {
      id: "tl-univr",
      kind: "education",
      title: "Laurea in Informatica (non terminata)",
      organization: "Università di Verona",
      period: "2019 — 2021",
      sortKey: 201909.5,
      impact:
        "Basi solide di programmazione e algoritmi, poi la scelta consapevole di privilegiare un percorso professionale già avviato.",
      context: [
        "Fondamenti di programmazione con Java, C e C++",
        "Algoritmi, strutture dati e basi di dati relazionali",
        "Percorso interrotto per dare priorità all'esperienza professionale in Calzedonia",
      ],
      learned: [
        "Le basi teoriche servono per capire perché un sistema si rompe, non solo come ripararlo",
        "Interrompere un percorso e dirlo apertamente è più utile di raccontarlo a metà",
      ],
      formalSummary:
        "Corso di laurea in Informatica presso l'Università di Verona. Percorso non completato; competenze acquisite in programmazione, algoritmi e basi di dati.",
      tags: ["Java", "C/C++", "Algoritmi", "Basi di dati"],
    },
    {
      id: "tl-pasoli",
      kind: "education",
      title: "Diploma di Ragioniere Programmatore",
      organization: "ITC A. Pasoli, Verona",
      period: "2014 — 2019",
      sortKey: 201409,
      impact:
        "Diploma conseguito con 78/100, con doppia base tecnica e amministrativa che uso ancora quando si parla di costi e processi.",
      context: [
        "Programmazione, basi di dati e sistemi informativi",
        "Economia aziendale, contabilità e diritto",
        "Progetti scolastici di sviluppo applicativo su base gestionale",
      ],
      learned: [
        "Capire un bilancio aiuta a spiegare all'IT perché una priorità è una priorità",
        "Il linguaggio dell'azienda è fatto di costi e margini, non di feature",
      ],
      formalSummary:
        "Diploma di Ragioniere Programmatore conseguito con votazione 78/100. Formazione tecnico-informatica ed economico-amministrativa.",
      tags: ["Programmazione", "Economia aziendale", "78/100"],
    },
  ],

  socials: [
    {
      id: "soc-linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/filippo-castagna-9220/",
    },
    { id: "soc-github", label: "GitHub", url: "https://github.com/filippocasta-sudo" },
    { id: "soc-email", label: "Email", url: "mailto:filippocasta@gmail.com" },
  ],
};

export default cvData;
