import type { CvDataLocaleBundle } from "@/lib/types";

export const cvDataEn: CvDataLocaleBundle = {
  personal: {
    name: "Filippo Castagna",
    roles: ["IT Omnichannel Delivery Specialist", "IT Project Coordinator"],
    statusBadge: "Currently at Calzedonia S.p.A.",
    intro:
      "I get things into production that others only put on the roadmap. I come from application support and omnichannel e-commerce: I learned to read a queue error, understand what it costs the business, and decide what gets fixed now and what can wait until Monday. I talk to developers without needing a translator and to the business without scaring them.",
    formalIntro:
      "IT professional with over five years of experience coordinating projects and application services in omnichannel e-commerce. Specialized in managing distributed teams, governing AMS services in an ITIL framework, and bridging business requirements with technical implementation. Currently employed at Calzedonia S.p.A. with delivery responsibility for omnichannel platforms.",
    email: "filippocasta@gmail.com",
    phone: "+39 349 000 0000",
    linkedin: "https://www.linkedin.com/in/filippo-castagna-9220/",
    location: "Tregnago (VR), Italy",
    license: "Category B driving licence — own vehicle",
    birthDate: "1992",
    languages: [
      { name: "Italian", level: "Native" },
      { name: "English", level: "B2" },
      { name: "French", level: "B1" },
    ],
  },

  goals: {
    headline:
      "I want to stop being the person who keeps the service running and become the person who decides what gets built.",
    targetRoles: [
      "Senior Project Manager",
      "Lead Functional Analyst",
      "Product Owner",
      "IT Delivery Manager",
    ],
    projectTypes: [
      "End-to-end omnichannel projects: store, e-commerce, logistics, and CRM that actually talk to each other",
      "Redesigning processes that today only work thanks to Excel and goodwill",
      "International rollouts with multiple vendors and time zones to keep aligned",
      "Moving from reactive AMS to a governed service with SLAs and metrics someone actually reads",
    ],
    idealContext: [
      "Product or retail companies with real volumes, where a wrong decision shows up on the shelf immediately",
      "Management that gives autonomy on priorities and holds you accountable for results, not hours",
      "Teams where the PM is inside technical decisions, not a go-between between tickets and stakeholders",
      "Serious hybrid: on-site when people need aligning, remote when you just need to focus",
    ],
  },

  hardSkills: [
    {
      id: "hs-pm",
      name: "Project & Delivery Management",
      summary:
        "Planning, progress tracking, and production release of deliverables involving multiple vendors.",
      details: [
        "Backlog and priority management with business impact criteria",
        "Coordinated release planning across internal teams and external partners",
        "Functional documentation, analysis, and alignment meeting minutes",
        "Predictive and agile methodologies applied to context, not dogma",
      ],
    },
    {
      id: "hs-omnichannel",
      name: "E-commerce & Omnichannel",
      summary:
        "Order, stock, returns, and integration flows between online channel, point of sale, and logistics.",
      details: [
        "Order management: ship-from-store, click & collect, cross-channel returns",
        "Stock synchronisation between warehouses, stores, and sales platform",
        "Analysis of order flow anomalies with direct impact on the end customer",
        "Interfacing with payment systems and logistics providers",
      ],
    },
    {
      id: "hs-salesforce",
      name: "Salesforce Cloud",
      summary:
        "Configuration and functional oversight of the Salesforce ecosystem on the commerce and service side.",
      details: [
        "Service Cloud: case management, queues, assignment rules",
        "Commerce Cloud: functional oversight of catalogue and order processes",
        "Definition of reports and dashboards for service monitoring",
        "Coordination with development teams on customisations and integrations",
      ],
    },
    {
      id: "hs-atlassian",
      name: "Atlassian Suite",
      summary:
        "Jira, Jira Service Management, and Confluence used as governance tools, not as an archive.",
      details: [
        "Workflow design, priority schemes, and automations in Jira",
        "Portal and SLA configuration in Jira Service Management",
        "Knowledge base structure in Confluence",
        "Reporting on ticket lifecycle and SLA compliance",
      ],
    },
    {
      id: "hs-ams",
      name: "AMS & ITIL",
      summary:
        "Governance of application maintenance services: incident, problem, and change management.",
      details: [
        "Incident management with classification by severity and impact",
        "Problem management: analysis of recurring causes and root-cause removal",
        "Change management and release windows agreed with the business",
        "Definition and monitoring of SLAs and service KPIs",
      ],
    },
    {
      id: "hs-tech",
      name: "Technical foundations & Data",
      summary:
        "SQL and programming languages: enough to read code, understand the problem, and not be sold a story.",
      details: [
        "SQL: analysis queries, data verification, flow reconciliation",
        "Java — solid foundation from academic studies",
        "Python — scripting and support automations",
        "C / C++ — algorithmic fundamentals from university studies",
        "HTML, CSS, JavaScript — reading and modifying existing interfaces",
        "Advanced Excel: pivot tables, lookup, data control models",
        "Postman and API testing tools for integration verification",
      ],
    },
  ],

  softSkills: [
    {
      id: "ss-coordination",
      name: "Distributed team coordination",
      summary:
        "I keep people aligned who do not share an office, language, or time zone.",
      details: [
        "Management of external vendors with shared objectives and deadlines",
        "Short meetings with written decisions: who does what and by when",
        "Escalations handled before they become political problems",
      ],
    },
    {
      id: "ss-bridge",
      name: "Business / Development bridge",
      summary:
        "I translate business requests into implementable requirements and technical constraints into understandable choices.",
      details: [
        "Requirements gathering and challenge: first I understand the problem, then I write the solution",
        "Reframing technical constraints as concrete impacts on time and cost",
        "Functional documentation usable by both developers and testers",
      ],
    },
    {
      id: "ss-priority",
      name: "Priority management under pressure",
      summary:
        "With ten urgent items at once, I decide which two actually matter and communicate that clearly.",
      details: [
        "Rapid assessment of the financial and reputational impact of an incident",
        "Transparent communication on what will not be done and why",
        "Composure during peaks: campaigns, Black Friday, critical releases",
      ],
    },
    {
      id: "ss-pragmatism",
      name: "Pragmatism and transparency",
      summary:
        "I prefer bad news early to good news that never arrives.",
      details: [
        "Estimates stated with a margin of uncertainty, not optimism",
        "Quick admission of mistakes and correction without blame-seeking",
        "Documented decisions so the same topics are not revisited every month",
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
      note: "Iterative management, backlog, and delivery cadences",
    },
    {
      id: "cert-pmi-predictive",
      name: "PMI Predictive Project Management",
      issuer: "Project Management Institute",
      year: "2026",
      primary: true,
      note: "Planning, WBS, scope and cost control",
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
      note: "Digital marketing and analytics fundamentals",
    },
    {
      id: "cert-english-london",
      name: "English Course — London",
      issuer: "Study abroad programme",
      year: "2018",
      primary: false,
      note: "Intensive course with full linguistic immersion",
    },
    {
      id: "cert-excel",
      name: "Advanced Excel for data analysis",
      issuer: "Corporate training",
      year: "2021",
      primary: false,
    },
  ],

  canDo: [
    {
      id: "can-1",
      label: "Deliver a project to production",
      detail:
        "From a vague requirement to a verified release, keeping vendors, testing, and communication together.",
    },
    {
      id: "can-2",
      label: "Translate between business and technical",
      detail:
        "I sit in the middle without being a messenger: I challenge requests and report constraints with numbers.",
    },
    {
      id: "can-3",
      label: "Govern an AMS service",
      detail:
        "Incident, problem, and change with measured SLAs and recurring causes removed, not just patched.",
    },
    {
      id: "can-4",
      label: "Decide under pressure",
      detail:
        "During peaks I choose what to save first and take responsibility for the decision.",
    },
    {
      id: "can-5",
      label: "Read data and code",
      detail:
        "SQL queries, logs, and APIs: I verify myself before opening a ticket for someone else.",
    },
    {
      id: "can-6",
      label: "Write usable documentation",
      detail:
        "Functional analyses that developers actually read and testers can use.",
    },
  ],

  cannotDo: [
    {
      id: "cannot-1",
      label: "Micro-management",
      detail:
        "I do not monitor people hour by hour. If that is what you need, I am not the right fit.",
    },
    {
      id: "cannot-2",
      label: "Advanced graphic and UI design",
      detail:
        "I can spot a wrong interface, but I leave design to those who do it for a living.",
    },
    {
      id: "cannot-3",
      label: "Full-time senior development",
      detail:
        "I read and modify code; I do not pass myself off as a full-time product developer.",
    },
    {
      id: "cannot-4",
      label: "Data science and ML models",
      detail:
        "I can read data and build reports; I do not train predictive models.",
    },
    {
      id: "cannot-5",
      label: "Promise deadlines that do not hold",
      detail:
        "I do not say yes to a deadline to please the room and argue two months later.",
    },
    {
      id: "cannot-6",
      label: "Legacy mainframe systems",
      detail:
        "Never worked on COBOL or AS/400: I would be starting from scratch, and I say so upfront, not after signing.",
    },
  ],

  compensation: {
    label: "Desired gross annual salary",
    range: "€50,000 – €60,000",
    note: "Open to discussion based on role, decision-making autonomy, and level of delivery responsibility.",
  },

  timeline: [
    {
      id: "tl-calzedonia-delivery",
      kind: "work",
      title: "IT Omnichannel Delivery Specialist",
      organization: "Calzedonia S.p.A.",
      period: "Feb 2026 — Present",
      sortKey: 202602,
      current: true,
      location: "Verona",
      impact:
        "Moved from overseeing the existing service to delivering new omnichannel functionality into production across multiple markets.",
      context: [
        "Coordination of omnichannel enhancement delivery across e-commerce, point of sale, and logistics",
        "Requirements gathering and formalisation with business stakeholders across countries",
        "Release planning with internal development teams and external partners",
        "Functional testing oversight before go-live",
      ],
      learned: [
        "A requirement accepted without challenge becomes a delivery problem, not the author's problem",
        "The difference between a successful release and a disaster almost always lies in test preparation",
      ],
      formalSummary:
        "Responsible for omnichannel initiative delivery: requirements gathering, release planning, vendor coordination, and functional testing oversight across multiple markets.",
      tags: ["Delivery", "Omnichannel", "Salesforce", "Jira"],
    },
    {
      id: "tl-calzedonia-ams",
      kind: "work",
      title: "IT Omnichannel AMS Coordinator",
      organization: "Calzedonia S.p.A.",
      period: "Jul 2020 — Jan 2026",
      sortKey: 202007,
      location: "Verona",
      impact:
        "Transformed reactive application support into a governed service with measured SLAs and recurring causes removed at the root.",
      context: [
        "Coordination of application maintenance service on omnichannel systems",
        "Incident and problem management with classification by impact and severity",
        "Governance of external vendors and distributed teams across different time zones",
        "Workflow, SLA, and automation configuration in Jira Service Management",
        "Periodic service performance reporting to management",
      ],
      learned: [
        "Closing tickets quickly is not a result: the result is that ticket not coming back",
        "During campaign peaks, priority must be decided in advance, not improvised during the incident",
        "A vendor performs as well as the scope you have given them is clear",
      ],
      formalSummary:
        "Coordination of AMS service on omnichannel platforms in an ITIL framework: incident and problem management, vendor governance, SLA definition, and service reporting.",
      tags: ["AMS", "ITIL", "Salesforce", "Jira Service Management", "SQL"],
    },
    {
      id: "tl-brennero",
      kind: "work",
      title: "IT Office Intern",
      organization: "Autostrade del Brennero S.p.A.",
      period: "Sep 2019 — Dec 2019",
      sortKey: 201909,
      location: "Trento",
      impact:
        "First exposure to a real corporate IT infrastructure and the gap between university theory and day-to-day operations.",
      context: [
        "Support to the IT office on internal system management and maintenance activities",
        "User assistance on workstations, applications, and peripherals",
        "Documentation of activities and configurations",
      ],
      learned: [
        "In a company, the user's problem matters more than the elegance of the solution",
        "Asking before touching a production system is a skill, not timidity",
      ],
      formalSummary:
        "Internship in the IT office with systems support activities, internal user assistance, and technical documentation.",
      tags: ["IT Support", "Infrastructure"],
    },
    {
      id: "tl-ristorazione",
      kind: "work",
      title: "Pizza Chef / Waiter",
      organization: "Restaurant and pizzeria",
      period: "2010 — 2021",
      sortKey: 201001,
      location: "Province of Verona",
      impact:
        "Eleven years of weekends in service: this is where I learned stress management and teamwork long before reading about them in a project management manual.",
      context: [
        "Counter and dining room management during evening peaks and weekends",
        "Coordination with kitchen and front of house to keep dish turnaround times",
        "Direct customer interaction, including complaints handled on the spot",
      ],
      learned: [
        "When thirty orders arrive at once, sequence matters more than speed",
        "An angry customer is won back with transparency and reliable timing, not generic apologies",
        "A team that covers for each other survives a Saturday night; one of individualists does not",
      ],
      formalSummary:
        "Restaurant work with food preparation and service duties, customer management, and operational coordination during peak periods.",
      tags: ["Stress management", "Teamwork", "Customer facing"],
    },
    {
      id: "tl-cv-app",
      kind: "project",
      title: "Self-hosted interactive CV",
      organization: "Personal project",
      period: "2026",
      sortKey: 202601,
      impact:
        "Built this CV as a Next.js application with an admin panel, to update content without touching code.",
      context: [
        "Single Page Application in Next.js with App Router, TypeScript, and Tailwind CSS",
        "Protected admin panel with full CRUD on timeline, skills, and goals",
        "Content persistence via API route and JSON archive",
        "Dual reading mode: candid version and printable formal CV",
      ],
      learned: [
        "Writing about yourself directly is harder than writing a functional analysis",
        "A minimal but real CMS is worth more than perfect content carved into code",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "tl-ristorante-paia",
      kind: "project",
      title: "Restaurant PWA with online booking and digital menu",
      organization: "Ristorante All'Apaia · Personal project",
      period: "2026",
      sortKey: 202602,
      location: "Tregnago (VR)",
      link: "https://www.ristoranteallapaia.it/",
      impact:
        "Built a PWA website for my wife's restaurant with online reservations and a daily menu managed from a back-end without touching code.",
      context: [
        "Installable Progressive Web App optimized for mobile",
        "Online booking module integrated into the restaurant's service flow",
        "Digital daily menu editable from an admin panel",
        "Stack and content designed to be run by the venue, not only by the developer",
      ],
      learned: [
        "A real client with Saturday service ahead beats any refactor in priority",
        "A PWA makes sense when the phone in your pocket is the restaurateur's work tool",
      ],
      formalSummary:
        "Design and development of a PWA for a restaurant business, with booking module and digital menu management via back-end.",
      tags: ["PWA", "Online booking", "CMS"],
    },
    {
      id: "tl-vivi-tregnago",
      kind: "project",
      title: "Digital platform for local deliveries during lockdown",
      organization: "Vivi Tregnago · Volunteering",
      period: "2020 — 2022",
      sortKey: 202212,
      location: "Tregnago (VR)",
      link: "https://www.facebook.com/ViviTregnago/",
      impact:
        "Contributed to the Vivi Tregnago project during Covid: digital coordination and creation of vivitregnago.it so local businesses could promote and organize home delivery under health restrictions.",
      context: [
        "Digital coordination of the civic project in response to lockdown",
        "Development of vivitregnago.it for showcase and home delivery organization",
        "Support for local businesses to stay reachable with shops closed",
        "The website is offline today; the project's Facebook page remains as a reference",
      ],
      learned: [
        "In a crisis you need a simple solution people understand on first contact",
        "A community project holds up when someone answers the phone, not only when the site is live",
      ],
      formalSummary:
        "Volunteering on the Vivi Tregnago project (Covid-19): digital management and web platform for promotion and home delivery of local businesses.",
      tags: ["Volunteering", "Covid-19", "Civic project"],
    },
    {
      id: "tl-automation",
      kind: "project",
      title: "AMS reporting automations",
      organization: "Personal project applied at work",
      period: "2023",
      sortKey: 202301,
      impact:
        "Reduced monthly service reporting preparation time from half a day to a few minutes.",
      context: [
        "Python scripts and SQL exports to aggregate ticket data",
        "Excel models with pivot tables and automatic data consistency checks",
        "Standardisation of reporting format for management",
      ],
      learned: [
        "Automating a report forces you to define what you are actually measuring",
        "Time saved each month should be reinvested in analysis, not in more reports",
      ],
      tags: ["Python", "SQL", "Excel"],
    },
    {
      id: "tl-univr",
      kind: "education",
      title: "Computer Science degree (incomplete)",
      organization: "Università di Verona",
      period: "2019 — 2021",
      sortKey: 201909.5,
      impact:
        "Solid foundations in programming and algorithms, then a conscious choice to prioritise an already established professional path.",
      context: [
        "Programming fundamentals with Java, C, and C++",
        "Algorithms, data structures, and relational databases",
        "Studies interrupted to prioritise professional experience at Calzedonia",
      ],
      learned: [
        "Theoretical foundations help you understand why a system breaks, not just how to fix it",
        "Stopping a path and saying so openly is more useful than telling half the story",
      ],
      formalSummary:
        "Computer Science degree programme at Università di Verona. Path not completed; skills acquired in programming, algorithms, and databases.",
      tags: ["Java", "C/C++", "Algorithms", "Databases"],
    },
    {
      id: "tl-pasoli",
      kind: "education",
      title: "Accounting and Programming Diploma",
      organization: "ITC A. Pasoli, Verona",
      period: "2014 — 2019",
      sortKey: 201409,
      impact:
        "Diploma awarded with 78/100, with a dual technical and administrative foundation I still use when discussing costs and processes.",
      context: [
        "Programming, databases, and information systems",
        "Business economics, accounting, and law",
        "School projects developing management applications",
      ],
      learned: [
        "Understanding a balance sheet helps explain to IT why a priority is a priority",
        "The language of business is costs and margins, not features",
      ],
      formalSummary:
        "Accounting and Programming Diploma awarded with grade 78/100. Technical-informatics and business-administrative training.",
      tags: ["Programming", "Business economics", "78/100"],
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
