import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ntecnologias",
    title: "Engenheiro de Software Sênior",
    company: "N Tecnologias — Coopercargo",
    period: "Fev 2025 – Atual",
    short:
      "Modernização de ERP, agentes de IA generativa e automação de processos logísticos críticos.",
    description: [
      "Liderou migração completa de ERP: modelagem de serviços em .NET, saneamento e migração de dados do sistema legado para o novo ambiente de produção.",
      "Projetou evolução arquitetural de monólito para serviços escaláveis em .NET, aumentando manutenibilidade e resiliência de soluções logísticas críticas.",
      "Implementou agentes de IA generativa para análise de bases desestruturadas e automação de consultas via execução segura de scripts SQL/NoSQL.",
      "Automatizou processos operacionais com n8n (workflows, webhooks e event-driven routines), eliminando erros manuais em rotinas críticas de alto volume.",
      "Desenvolveu e sustentou aplicativo mobile cross-platform com Ionic, focando em estabilidade e experiência do usuário.",
      "Adotou Supabase (PostgreSQL/Storage/Auth) como plataforma de aceleração para integrações e entregas internas.",
    ],
    tech: ["dotnet", "csharp", "ionic", "supabase", "postgresql", "n8n", "azuredevops", "git"],
  },
  {
    id: "eos",
    title: "Desenvolvedor Web",
    company: "EOS — Organização e Sistemas",
    period: "Dez 2023 – Ago 2024",
    short:
      "Sistemas para empresas de saneamento municipal e estadual, com foco em performance e offline-first.",
    description: [
      "Reduziu em até 70% o tempo de processamento de relatórios e consultas via otimização de Stored Procedures e queries no SQL Server.",
      "Projetou e entregou aplicativos offline-first com .NET MAUI para equipes de campo em áreas sem conectividade.",
      "Desenvolveu APIs e aplicações Web em .NET para operações de saneamento (Sanesu-MS, Codau-MG, DESO-SE), apoiando gestão de clientes, equipes e dados.",
    ],
    tech: ["dotnet", "csharp", "sqlserver", "javascript", "angular", "git", "postman"],
  },
  {
    id: "blump",
    title: "Desenvolvedor Full Stack (PJ)",
    company: "Blump LTDA",
    period: "Nov 2023 – Dez 2023",
    short:
      "Automação completa do fluxo de pedidos e evolução do pipeline CI/CD de e-commerce de alto tráfego.",
    description: [
      "Automatizou 100% do fluxo de pedidos, faturamento e controle de estoque via integração com ERP Tiny, eliminando processos manuais críticos.",
      "Reduziu tempo de deploy de horas para minutos com evolução do pipeline CI/CD no Azure DevOps, com releases rastreáveis.",
      "Desenvolveu módulos da plataforma de e-commerce de alto tráfego em .NET e Vue.js, com foco em performance e confiabilidade.",
      "Implementou automações com n8n para sincronizações e processos por evento, aumentando visibilidade operacional.",
    ],
    tech: ["dotnet", "csharp", "vue", "typescript", "n8n", "azuredevops", "sqlserver", "git"],
  },
  {
    id: "inovvati",
    title: "Desenvolvedor Júnior",
    company: "Inovvati Tecnologia",
    period: "Set 2021 – Out 2023",
    short: "Desenvolvimento de sistemas para a área contábil e gerencial da Secretaria de Fazenda do MS.",
    description: [
      "Desenvolveu interfaces reativas com React e Next.js, com foco em UX e métricas de Core Web Vitals.",
      "Integrou APIs REST e GraphQL em arquitetura distribuída, garantindo consistência e rastreabilidade de dados.",
      "Sustentou e modernizou sistemas legados em .NET, entregando melhorias incrementais com baixo risco.",
    ],
    tech: ["react", "nextjs", "typescript", "javascript", "graphql", "csharp", "dotnet", "azuredevops", "git"],
  },
];
