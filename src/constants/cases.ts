import type { OpenSourceItem } from "@/types";

// Short list of what each job delivered. The full descriptions live in projects.ts and open in the modal.
export const deliveries: Record<string, string[]> = {
  ibr: ["Novo módulo Financeiro do ERP", "Machine learning para risco financeiro"],
  ntecnologias: ["Migração completa de ERP, do monólito aos serviços", "Agentes de IA e automação de processos"],
  eos: ["Relatórios 70% mais rápidos", "Apps offline-first em .NET MAUI"],
  blump: ["Pedidos 100% automáticos", "Deploy de horas para minutos"],
  inovvati: ["Sistemas contábeis e gerenciais da Fazenda do MS"],
};

// Open source runs on its own line in the Experience section and each item is a slide of its carousel.
export const OPEN_SOURCE_BRANCH_FROM = "ibr";

export const openSourceItems: OpenSourceItem[] = [
  { id: "contribuidor", title: "Contribuidor Open Source", period: "2026 – Atual" },
  { id: "proximas", title: "Próximas contribuições", period: "em exploração" },
];

export const openSourceCase = {
  repo: "dotnet/machinelearning",
  status: "Em revisão · PR #7918",
  href: "https://github.com/dotnet/machinelearning/pull/7918",
  summary:
    "Corrigindo o download de modelos grandes no ML.NET: o arquivo passa a ser gravado em disco em streaming, sem estourar o limite de 2 GB do HttpClient.",
  steps: [
    "Investiguei a issue #5532: o HttpClient lia o corpo inteiro em memória e falhava em arquivos acima de 2 GB.",
    "O Mutex, que quebrava após um await, deu lugar a um lock de arquivo entre processos.",
    "Cobri o comportamento com testes locais, sem rede, que compilam em net8.0, net9.0 e net48.",
  ],
  tech: ["dotnet", "csharp", "github"] as const,
};
