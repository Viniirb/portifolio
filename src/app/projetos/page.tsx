import BackgroundCircuit from '@/components/BackgroundCircuit/BackgroundCircuit';
import ProjectCard, { Project } from '@/components/ProjectCard/ProjectCard';
import styles from './Projetos.module.css';

export const metadata = {
  title: 'Projetos | Portfólio',
};

const projects: Project[] = [
  {
    id: 'b2b-portal',
    title: 'Desenvolvedor Full Stack - Blump LTDA',
    company: 'ACME S.A.',
    period: '2023 — 2024',
    short: 'Portal para clientes corporativos com catálogo, carrinho e aprovação por hierarquia.',
    description: [
      'Implementei catálogo com busca e filtros, carrinho multi-lista e fluxo de aprovação por níveis.',
      'Integração com ERP para preços, estoque e pedidos; cache de dados e SSR para melhorar TTFB.',
      'Observabilidade com logs estruturados e métricas de performance na pipeline de CI/CD.',
    ],
    tech: ['nextjs', 'react', 'typescript', 'node', 'sqlserver'],
    links: {
      repo: 'https://github.com/Viniirb',   // ajuste se tiver repo específico
      demo: '#',
    },
  },
  {
    id: 'erp-integrations',
    title: 'Integração ERP — Microsserviços',
    company: 'TechCorp',
    period: '2022',
    short: 'Orquestração de integrações entre ERP, CRM e e-commerce usando filas e serviços desacoplados.',
    description: [
      'Criei serviços .NET para sync de produtos, pedidos e faturas com garantias de entrega.',
      'Dapper para performance com SQL Server, jobs de reprocessamento e DLQ.',
      'Dockerization, versionamento de schema e monitoramento de saúde nos serviços.',
    ],
    tech: ['dotnet', 'csharp', 'dapper', 'sqlserver', 'docker'],
    links: {
      repo: 'https://github.com/Viniirb',
    },
  },
  {
    id: 'devops-dashboard',
    title: 'Dashboard DevOps',
    company: 'InovaTech',
    period: '2024',
    short: 'Visão de pipelines, releases e issues em um único painel para o time.',
    description: [
      'Consumo de API do Azure DevOps para consolidar status de builds, releases e work items.',
      'SSR e caching incremental; filtros por projeto e squads; gráficos e indicadores.',
      'Hardening de segurança e adoção de feature flags para lançamentos controlados.',
    ],
    tech: ['nextjs', 'typescript', 'azuredevops', 'node'],
    links: {
      demo: '#',
    },
  },
];

export default function ProjetosPage() {
  return (
    <>
      <BackgroundCircuit />
      <main id="projetos" className={styles.container}>
        <section className={styles.wrap}>
          <h1 className={styles.title}>Projetos</h1>
          <p className={styles.subtitle}>
            Alguns trabalhos em que atuei recentemente. Clique em um card para ver detalhes.
          </p>

          <div className={styles.grid}>
            {projects.map((p, i) => {
              const delayClass =
                i % 3 === 1 ? styles.cardEnterDelay80 :
                i % 3 === 2 ? styles.cardEnterDelay160 :
                styles.cardEnter;
              return (
                <ProjectCard key={p.id} project={p} className={delayClass} />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}