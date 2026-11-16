import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ibr",
    title: { pt: "Engenheiro de Software Sênior", en: "Senior Software Engineer" },
    company: "iBR Software",
    period: { pt: "Abr 2026 – Nov 2026", en: "Apr 2026 – Nov 2026" },
    award: {
      label: { pt: "Prêmio de Excelência da iBR · Out/2026", en: "iBR Excellence Award · Oct 2026" },
      detail: { pt: "pelas entregas e correções bem executadas.", en: "for well-executed deliveries and fixes." },
    },
    short: {
      pt: "Modernização do ERP, novo módulo Financeiro e pipeline de machine learning para risco financeiro.",
      en: "ERP modernization, the new Finance module and a machine learning pipeline for financial risk.",
    },
    description: {
      pt: [
        "Atuou na modernização do ERP com arquitetura distribuída, contratos, fronteiras de domínio, adaptadores e integração entre aplicações .NET.",
        "Foi responsável pela estruturação do novo Financeiro: contas a pagar/receber, créditos, baixas, transferências, pendências, plano de contas, centros de custo e históricos.",
        "Implementou migração e cutover com validação, reconciliação, isolamento por empresa, idempotência, atomicidade, auditoria, feature flags e retry.",
        "Desenvolveu pipeline de machine learning para risco financeiro, com dados temporais, governança, treinamento, inferência segura e monitoramento auditável.",
        "Entregou APIs, dashboard, DRE, exportação XLSX, integrações de marketplace e melhorias de UX, acessibilidade, temas, mobile e qualidade.",
      ],
      en: [
        "Worked on ERP modernization with a distributed architecture, contracts, domain boundaries, adapters and integration between .NET applications.",
        "Responsible for structuring the new Finance module: accounts payable/receivable, credits, settlements, transfers, pending items, chart of accounts, cost centers and histories.",
        "Implemented migration and cutover with validation, reconciliation, per-company isolation, idempotency, atomicity, auditing, feature flags and retry.",
        "Developed a machine learning pipeline for financial risk, with temporal data, governance, training, safe inference and auditable monitoring.",
        "Delivered APIs, a dashboard, an income statement (DRE), XLSX export, marketplace integrations and improvements in UX, accessibility, theming, mobile and quality.",
      ],
    },
    tech: ["dotnet", "ml", "claudecode", "codex", "jenkins", "githubactions", "rabbitmq", "sqlserver", "git", "github"],
  },
  {
    id: "ntecnologias",
    title: { pt: "Engenheiro de Software Sênior", en: "Senior Software Engineer" },
    company: "N Tecnologias — Coopercargo",
    period: { pt: "Fev 2025 – Abr 2026", en: "Feb 2025 – Apr 2026" },
    short: {
      pt: "Modernização de ERP, agentes de IA generativa e automação de processos logísticos críticos.",
      en: "ERP modernization, generative AI agents and automation of critical logistics processes.",
    },
    description: {
      pt: [
        "Liderou migração completa de ERP: modelagem de serviços em .NET, saneamento e migração de dados do sistema legado para o novo ambiente de produção.",
        "Projetou evolução arquitetural de monólito para serviços escaláveis em .NET, aumentando manutenibilidade e resiliência de soluções logísticas críticas.",
        "Implementou agentes de IA generativa para análise de bases desestruturadas e automação de consultas via execução segura de scripts SQL/NoSQL.",
        "Automatizou processos operacionais com n8n (workflows, webhooks e event-driven routines), eliminando erros manuais em rotinas críticas de alto volume.",
        "Desenvolveu e sustentou aplicativo mobile cross-platform com Ionic, focando em estabilidade e experiência do usuário.",
        "Adotou Supabase (PostgreSQL/Storage/Auth) como plataforma de aceleração para integrações e entregas internas.",
      ],
      en: [
        "Led a full ERP migration: service modeling in .NET, data cleansing and migration from the legacy system to the new production environment.",
        "Designed the architectural evolution from a monolith to scalable .NET services, increasing maintainability and resilience of critical logistics solutions.",
        "Implemented generative AI agents to analyze unstructured data and automate queries through safe execution of SQL/NoSQL scripts.",
        "Automated operational processes with n8n (workflows, webhooks and event-driven routines), eliminating manual errors in critical high-volume routines.",
        "Built and maintained a cross-platform mobile app with Ionic, focused on stability and user experience.",
        "Adopted Supabase (PostgreSQL/Storage/Auth) as an acceleration platform for integrations and internal deliveries.",
      ],
    },
    tech: ["dotnet", "csharp", "ionic", "supabase", "postgresql", "n8n", "azuredevops", "git"],
  },
  {
    id: "eos",
    title: { pt: "Desenvolvedor Web", en: "Web Developer" },
    company: "EOS — Organização e Sistemas",
    period: { pt: "Dez 2023 – Ago 2024", en: "Dec 2023 – Aug 2024" },
    short: {
      pt: "Sistemas para empresas de saneamento municipal e estadual, com foco em performance e offline-first.",
      en: "Systems for municipal and state sanitation companies, focused on performance and offline-first.",
    },
    description: {
      pt: [
        "Reduziu em até 70% o tempo de processamento de relatórios e consultas via otimização de Stored Procedures e queries no SQL Server.",
        "Projetou e entregou aplicativos offline-first com .NET MAUI para equipes de campo em áreas sem conectividade.",
        "Desenvolveu APIs e aplicações Web em .NET para operações de saneamento (Sanesu-MS, Codau-MG, DESO-SE), apoiando gestão de clientes, equipes e dados.",
      ],
      en: [
        "Cut report and query processing time by up to 70% by optimizing Stored Procedures and queries on SQL Server.",
        "Designed and delivered offline-first apps with .NET MAUI for field teams in areas without connectivity.",
        "Developed .NET APIs and web applications for sanitation operations (Sanesu-MS, Codau-MG, DESO-SE), supporting customer, team and data management.",
      ],
    },
    tech: ["dotnet", "csharp", "sqlserver", "javascript", "angular", "git", "postman"],
  },
  {
    id: "blump",
    title: { pt: "Desenvolvedor Full Stack (PJ)", en: "Full Stack Developer (contractor)" },
    company: "Blump LTDA",
    period: { pt: "Nov 2023 – Dez 2023", en: "Nov 2023 – Dec 2023" },
    short: {
      pt: "Automação completa do fluxo de pedidos e evolução do pipeline CI/CD de e-commerce de alto tráfego.",
      en: "Full automation of the order flow and evolution of the CI/CD pipeline of a high-traffic e-commerce.",
    },
    description: {
      pt: [
        "Automatizou 100% do fluxo de pedidos, faturamento e controle de estoque via integração com ERP Tiny, eliminando processos manuais críticos.",
        "Reduziu tempo de deploy de horas para minutos com evolução do pipeline CI/CD no Azure DevOps, com releases rastreáveis.",
        "Desenvolveu módulos da plataforma de e-commerce de alto tráfego em .NET e Vue.js, com foco em performance e confiabilidade.",
        "Implementou automações com n8n para sincronizações e processos por evento, aumentando visibilidade operacional.",
      ],
      en: [
        "Automated 100% of the order, invoicing and stock control flow through the Tiny ERP integration, eliminating critical manual processes.",
        "Cut deploy time from hours to minutes by evolving the CI/CD pipeline on Azure DevOps, with traceable releases.",
        "Developed modules of the high-traffic e-commerce platform in .NET and Vue.js, focused on performance and reliability.",
        "Implemented n8n automations for synchronizations and event-driven processes, increasing operational visibility.",
      ],
    },
    tech: ["dotnet", "csharp", "vue", "typescript", "n8n", "azuredevops", "sqlserver", "git"],
  },
  {
    id: "inovvati",
    title: { pt: "Desenvolvedor Júnior", en: "Junior Developer" },
    company: "Inovvati Tecnologia",
    period: { pt: "Set 2021 – Out 2023", en: "Sep 2021 – Oct 2023" },
    short: {
      pt: "Desenvolvimento de sistemas para a área contábil e gerencial da Secretaria de Fazenda do MS.",
      en: "Development of systems for the accounting and management area of the Mato Grosso do Sul State Treasury.",
    },
    description: {
      pt: [
        "Desenvolveu interfaces reativas com React e Next.js, com foco em UX e métricas de Core Web Vitals.",
        "Integrou APIs REST e GraphQL em arquitetura distribuída, garantindo consistência e rastreabilidade de dados.",
        "Sustentou e modernizou sistemas legados em .NET, entregando melhorias incrementais com baixo risco.",
      ],
      en: [
        "Developed reactive interfaces with React and Next.js, focused on UX and Core Web Vitals metrics.",
        "Integrated REST and GraphQL APIs in a distributed architecture, ensuring data consistency and traceability.",
        "Maintained and modernized legacy .NET systems, delivering incremental improvements at low risk.",
      ],
    },
    tech: ["react", "nextjs", "typescript", "javascript", "graphql", "csharp", "dotnet", "azuredevops", "git"],
  },
];
