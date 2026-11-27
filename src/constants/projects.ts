import type { Project } from "@/types";

// Newest first. The Experience timeline reverses this list, so keep the order.
export const projects: Project[] = [
  {
    id: "ibr",
    title: { pt: "Engenheiro de Software Sênior (PJ)", en: "Senior Software Engineer (contractor)" },
    company: "iBR Tecnologia",
    period: { pt: "Abr 2026 – Nov 2026", en: "Apr 2026 – Nov 2026" },
    award: {
      label: { pt: "Destaque do Mês · Set/2026", en: "Top Performer of the Month · Sep 2026" },
      detail: { pt: "pela excelência nas entregas.", en: "for delivery excellence." },
    },
    short: {
      pt: "Novo módulo Financeiro do ERP, modernização para arquitetura distribuída e modelo de risco financeiro com ML.NET.",
      en: "The ERP's new Finance module, modernization to a distributed architecture and a financial risk model with ML.NET.",
    },
    description: {
      pt: [
        "Desenvolveu funcionalidades do novo módulo Financeiro do ERP em .NET/C# (contas a pagar e a receber, créditos, baixas, transferências, plano de contas e centros de custo), dentro da modernização para arquitetura distribuída orientada a DDD.",
        "Implementou modelo de análise de risco financeiro com ML.NET, da engenharia de features sobre séries temporais ao treinamento e à inferência exposta via API.",
        "Integrou o ERP aos marketplaces Mercado Livre, Shopee, Magalu e OLX e ao e-commerce próprio da iBR.",
        "Entregou APIs REST, dashboard gerencial e DRE com exportação XLSX. No frontend (Angular e PrimeNG), implementou temas, acessibilidade e responsividade mobile com CSS próprio.",
        "Atuou na sustentação em produção com hotfixes de incidentes críticos, diagnosticando a causa raiz em logs e no banco de dados em um cenário de alto volume de chamados.",
        "Implementou upload e armazenamento de arquivos no AWS S3.",
        "Orientou o time nas regras do módulo Financeiro e em boas práticas de desenvolvimento com agentes de IA (Claude Code), e criou uma skill para o QA validar qualquer tarefa no ambiente local.",
      ],
      en: [
        "Built features for the ERP's new Finance module in .NET/C# (accounts payable and receivable, credits, settlements, transfers, chart of accounts and cost centers) as part of the move to a DDD-based distributed architecture.",
        "Implemented a financial risk model with ML.NET, from time-series feature engineering to training and inference served through the API.",
        "Integrated the ERP with the Mercado Livre, Shopee, Magalu and OLX marketplaces and with the company's own e-commerce platform.",
        "Shipped REST APIs, a management dashboard and an income statement (DRE) report with XLSX export. On the frontend (Angular and PrimeNG), implemented theming, accessibility and mobile responsiveness with custom CSS.",
        "Supported production through hotfixes for critical incidents, tracing root causes through logs and database analysis under a high ticket volume.",
        "Implemented file upload and storage on AWS S3.",
        "Coached the team on Finance module business rules and on best practices for AI-agent-assisted development (Claude Code), and built a skill that lets QA validate any task on their local machine.",
      ],
    },
    tech: ["dotnet", "csharp", "efcore", "postgresql", "rabbitmq", "xunit", "docker", "ml", "angular", "primeng", "hangfire", "awss3", "claudecode", "git"],
  },
  {
    id: "ntecnologias",
    title: { pt: "Engenheiro de Software Sênior (PJ)", en: "Senior Software Engineer (contractor)" },
    company: "N Tecnologias",
    period: { pt: "Fev 2025 – Abr 2026", en: "Feb 2025 – Apr 2026" },
    short: {
      pt: "Migração de ERP na Coopercargo, assistente RAG em produção e automação de processos logísticos críticos.",
      en: "ERP migration at Coopercargo, a production RAG assistant and automation of critical logistics processes.",
    },
    description: {
      pt: [
        "Liderou, na Coopercargo, a migração do ERP legado para o Benner e, em seguida, do Benner para serviços próprios em .NET, incluindo saneamento e migração de centenas de milhares de registros.",
        "Projetou a evolução de monólito para serviços .NET em soluções logísticas críticas, com foco em manutenibilidade e resiliência.",
        "Desenvolveu para outro cliente um assistente RAG, em produção, para consulta de dados em linguagem natural (Python, FastAPI, Gemini, ChromaDB, React). Mapeou o dicionário de dados de um SQL Server mal estruturado e implementou execução segura das consultas geradas, troca de modelos e controle de rate limit e tokens.",
        "Desenvolveu serviços e integrações com Azure Functions, Blob Storage e Microsoft Graph, jobs com Hangfire e APIs documentadas em OpenAPI com autenticação JWT.",
        "Desenvolveu dashboard de controle de frota em Electron, Bun e React, com rastreamento dos veículos em tempo real no mapa.",
        "Automatizou processos operacionais com n8n (workflows, webhooks e rotinas orientadas a eventos), eliminando etapas manuais em rotinas críticas.",
        "Manteve aplicativo mobile multiplataforma com Ionic e adotou Supabase (PostgreSQL, Storage e Auth) como backend para entregas internas.",
        "Administrou o Azure DevOps do projeto: repositórios, políticas de branch, pipelines de CI/CD e quadros Scrum.",
      ],
      en: [
        "Led the ERP migration at client Coopercargo, first from the legacy system to Benner and then from Benner to in-house .NET services, including cleansing and migrating hundreds of thousands of records.",
        "Designed the evolution from a monolith to .NET services for business-critical logistics systems, focusing on maintainability and resilience.",
        "Built a production RAG assistant for another client that answers data questions in natural language (Python, FastAPI, Gemini, ChromaDB, React). Mapped the data dictionary of a poorly structured SQL Server database and implemented safe execution of generated queries, model switching and rate-limit/token handling.",
        "Developed services and integrations with Azure Functions, Blob Storage and Microsoft Graph, background jobs with Hangfire, and OpenAPI-documented APIs secured with JWT.",
        "Built a fleet management dashboard with Electron, Bun and React, with real-time vehicle tracking on a map.",
        "Automated operational processes with n8n (workflows, webhooks and event-driven routines), removing manual steps from critical routines.",
        "Maintained a cross-platform Ionic mobile app and adopted Supabase (PostgreSQL, Storage and Auth) as the backend for internal deliveries.",
        "Managed the project's Azure DevOps: repositories, branch policies, CI/CD pipelines and Scrum boards.",
      ],
    },
    tech: ["dotnet", "csharp", "sqlserver", "python", "gemini", "chromadb", "react", "electron", "bun", "azurefunctions", "hangfire", "jwt", "openapi", "ionic", "supabase", "n8n", "azuredevops", "git"],
  },
  {
    id: "blump",
    title: { pt: "Desenvolvedor Full Stack (PJ)", en: "Full Stack Developer (contractor)" },
    company: "Blump",
    period: { pt: "Set 2024 – Dez 2024", en: "Sep 2024 – Dec 2024" },
    short: {
      pt: "Integração do e-commerce com o ERP Tiny e pipeline de CI/CD no Azure DevOps.",
      en: "E-commerce integration with Tiny ERP and a CI/CD pipeline on Azure DevOps.",
    },
    description: {
      pt: [
        "Integrou o e-commerce ao ERP Tiny, automatizando a criação de pedidos e a sincronização de estoque entre a loja e o ERP.",
        "Substituiu o deploy manual por pipeline de CI/CD no Azure DevOps, com releases rastreáveis.",
        "Desenvolveu módulos da plataforma de e-commerce em .NET e Vue.js.",
        "Implementou automações com n8n para sincronizações e processos orientados a eventos.",
      ],
      en: [
        "Integrated the e-commerce platform with Tiny ERP, automating order creation and inventory sync between the store and the ERP.",
        "Replaced manual deployments with a CI/CD pipeline on Azure DevOps with traceable releases.",
        "Built e-commerce platform modules in .NET and Vue.js.",
        "Implemented n8n automations for data sync and event-driven processes.",
      ],
    },
    tech: ["dotnet", "csharp", "vue", "n8n", "azuredevops", "git"],
  },
  {
    id: "eos",
    title: { pt: "Desenvolvedor Web", en: "Web Developer" },
    company: "EOS — Organização e Sistemas",
    period: { pt: "Dez 2023 – Ago 2024", en: "Dec 2023 – Aug 2024" },
    short: {
      pt: "Otimização de SQL Server, integrações financeiras com Serasa e Boa Vista e apps offline-first em .NET MAUI.",
      en: "SQL Server tuning, financial integrations with Serasa and Boa Vista and offline-first .NET MAUI apps.",
    },
    description: {
      pt: [
        "Reduziu relatórios e consultas pesadas no SQL Server de minutos para segundos, com índices, reescrita de procedures, análise de plano de execução, paginação e cache. Também moveu a geração dos relatórios mais pesados para processamento em background, tirando carga do banco.",
        "Otimizou as integrações financeiras com Serasa e Boa Vista para envio e baixa de negativações.",
        "Migrou telas de ASP.NET Web Forms para ASP.NET MVC e evoluiu telas MVC existentes.",
        "Desenvolveu aplicativos offline-first com .NET MAUI para equipes de campo em áreas sem conectividade.",
      ],
      en: [
        "Cut heavy SQL Server reports and queries from minutes to seconds through indexing, procedure rewrites, execution plan analysis, pagination and caching. Moved the heaviest report generation to background processing to offload the database.",
        "Optimized financial integrations with the Serasa and Boa Vista credit bureaus for submitting and clearing debtor records.",
        "Migrated ASP.NET Web Forms pages to ASP.NET MVC and improved existing MVC pages.",
        "Built offline-first .NET MAUI apps for field teams working in areas without connectivity.",
      ],
    },
    tech: ["dotnet", "csharp", "sqlserver", "plsql", "maui", "git"],
  },
  {
    id: "inovvati",
    title: { pt: "Desenvolvedor Júnior", en: "Junior Developer" },
    company: "Inovvati Tecnologia",
    period: { pt: "Jan 2021 – Out 2023", en: "Jan 2021 – Oct 2023" },
    short: {
      pt: "Sistemas contábeis e gerenciais para a Secretaria de Fazenda do MS (SEFAZ-MS).",
      en: "Accounting and management systems for the Mato Grosso do Sul State Finance Department (SEFAZ-MS).",
    },
    description: {
      pt: [
        "Desenvolveu sistemas contábeis e gerenciais para a Secretaria de Fazenda do Estado de Mato Grosso do Sul (SEFAZ-MS). Ingressou pela academia interna de formação (8 meses) e foi efetivado como desenvolvedor.",
        "Desenvolveu interfaces em React e Next.js com TypeScript, Vite e Tailwind CSS, com foco em UX e Core Web Vitals.",
        "Integrou APIs REST e GraphQL em arquitetura distribuída.",
        "Sustentou e modernizou sistemas legados em .NET.",
        "Manteve repositórios, políticas de branch, pipelines de CI/CD e quadros Scrum no Azure DevOps.",
      ],
      en: [
        "Developed accounting and management systems for the Mato Grosso do Sul State Finance Department (SEFAZ-MS). Joined through an 8-month internal training academy and was then hired as a developer.",
        "Built React and Next.js interfaces with TypeScript, Vite and Tailwind CSS, focusing on UX and Core Web Vitals.",
        "Integrated REST and GraphQL APIs in a distributed architecture.",
        "Maintained and modernized legacy .NET systems.",
        "Maintained repositories, branch policies, CI/CD pipelines and Scrum boards on Azure DevOps.",
      ],
    },
    tech: ["react", "nextjs", "typescript", "vite", "graphql", "csharp", "dotnet", "azuredevops", "git"],
  },
];
