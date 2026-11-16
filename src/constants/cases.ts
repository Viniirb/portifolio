import type { Localized } from "@/i18n/types";
import type { OpenSourceItem } from "@/types";

// Short list of what each job delivered. The full descriptions live in projects.ts and open in the modal.
export const deliveries: Record<string, Localized<string[]>> = {
  ibr: {
    pt: ["Novo módulo Financeiro do ERP", "Machine learning para risco financeiro"],
    en: ["New Finance module for the ERP", "Machine learning for financial risk"],
  },
  ntecnologias: {
    pt: ["Migração completa de ERP, do monólito aos serviços", "Agentes de IA e automação de processos"],
    en: ["Full ERP migration, from monolith to services", "AI agents and process automation"],
  },
  eos: {
    pt: ["Relatórios 70% mais rápidos", "Apps offline-first em .NET MAUI"],
    en: ["Reports up to 70% faster", "Offline-first apps with .NET MAUI"],
  },
  blump: {
    pt: ["Pedidos 100% automáticos", "Deploy de horas para minutos"],
    en: ["100% automated orders", "Deploys from hours to minutes"],
  },
  inovvati: {
    pt: ["Sistemas contábeis e gerenciais da Fazenda do MS"],
    en: ["Accounting and management systems for the MS State Treasury"],
  },
};

// Open source runs on its own line in the Experience section and each item is a slide of its carousel.
export const OPEN_SOURCE_BRANCH_FROM = "ibr";

export const openSourceItems: OpenSourceItem[] = [
  {
    id: "contribuidor",
    title: { pt: "Contribuidor Open Source", en: "Open Source Contributor" },
    period: { pt: "2026 – Atual", en: "2026 – Present" },
  },
  {
    id: "proximas",
    title: { pt: "Próximas contribuições", en: "Upcoming contributions" },
    period: { pt: "em exploração", en: "exploring" },
  },
];

export const openSourceCase = {
  repo: "dotnet/machinelearning",
  status: { pt: "Em revisão · PR #7918", en: "Under review · PR #7918" },
  href: "https://github.com/dotnet/machinelearning/pull/7918",
  summary: {
    pt: "Corrigindo o download de modelos grandes no ML.NET: o arquivo passa a ser gravado em disco em streaming, sem estourar o limite de 2 GB do HttpClient.",
    en: "Fixing large model downloads in ML.NET: the file is now written to disk as a stream, without hitting the 2 GB limit of HttpClient.",
  },
  steps: {
    pt: [
      "Investiguei a issue #5532: o HttpClient lia o corpo inteiro em memória e falhava em arquivos acima de 2 GB.",
      "O Mutex, que quebrava após um await, deu lugar a um lock de arquivo entre processos.",
      "Cobri o comportamento com testes locais, sem rede, que compilam em net8.0, net9.0 e net48.",
    ],
    en: [
      "I investigated issue #5532: HttpClient read the whole body into memory and failed on files above 2 GB.",
      "The Mutex, which broke after an await, was replaced by a cross-process file lock.",
      "I covered the behavior with local, network-free tests that compile on net8.0, net9.0 and net48.",
    ],
  } as Localized<string[]>,
  tech: ["dotnet", "csharp", "github"] as const,
};
