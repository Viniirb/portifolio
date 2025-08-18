import BackgroundCircuit from '@/components/BackgroundCircuit/BackgroundCircuit';
import ProjectCard, { Project } from '@/components/ProjectCard/ProjectCard';
import styles from './Projetos.module.css';

export const metadata = {
  title: 'Projetos | Portfólio',
};

const projects: Project[] = [
  {
    id: 'blump',
    title: 'Desenvolvedor Full Stack',
    company: 'Blump-LTDA',
    period: '2024 — 2024',
    short: 'Portal para clientes corporativos com catálogo, carrinho e planos de assinatura.',
    description: [
      'Desenvolvi um catálogo completo com funcionalidades avançadas de busca e filtros, além de um carrinho multi-lista integrado a um fluxo de aprovação por níveis.',
      'Implementei a integração com ERP para sincronização eficiente de preços, estoque e pedidos.',
      'Participei da definição de planos de assinatura, cadastro de clientes e suporte técnico, garantindo uma experiência robusta para os usuários corporativos.'
    ],
    tech: ['dotnet','csharp', 'vue', 'typescript', 'sqlserver', 'git', 'postman']
  },
  {
    id: 'eos',
    title: 'Desenvolvedor Web',
    company: 'Eos Systems',
    period: '2023-2024',
    short: 'Desenvolvimento e manutenção de sistemas para empresas de saneamento municipal e estadual.',
    description: [
      'Realizei manutenção de sistemas legados em .NET e conduzi a migração para arquitetura de microsserviços, promovendo maior escalabilidade.',
      'Efetuei correções de bugs e melhorias de performance para garantir a estabilidade dos sistemas.',
      'Gerenciei cadastro, atualização e exclusão de dados, além do desenvolvimento de novas funcionalidades e integração com APIs externas.',
      'Atuei no desenvolvimento mobile utilizando Xamarin, ampliando o alcance das soluções.',
      'Os projetos atenderam empresas como Sanesu - MS, Codau - MG, DESO - SE, entre outras.'
    ],
    tech: ['dotnet', 'csharp', 'sqlserver', 'jira', 'postman', 'javascript', 'git', 'bitbucket', 'angular', 'bootstrap']
  },
  {
    id: 'inovvati',
    title: 'Desenvolvedor Junior',
    company: 'Inovvati',
    period: '2021-2023',
    short: 'Desenvolvimento focado em sistemas internos para gestão contábil.',
    description: [
      'Desenvolvi consumo de APIs externas utilizando GraphQL, garantindo integração eficiente.',
      'Atuei no desenvolvimento web com React e JavaScript puro, além do backend com Dapper, C# e GraphQL.',
      'Foquei em soluções para a área contábil e gerencial da Secretaria de Fazenda do Estado de Mato Grosso do Sul.',
      'Participei do gerenciamento ágil com Scrum e Azure DevOps, promovendo entregas contínuas.',
      'Configurei ambientes de desenvolvimento e produção no Azure, assegurando estabilidade e escalabilidade.'
    ],
    tech: ['nextjs', 'typescript', 'azuredevops', 'csharp', 'graphql', 'sqlserver', 'azuredevops', 'git', 'postman', 'react',
      'javascript', 'styledcomponents', 'vscode', 'typescript', 'minio', 'dotenv', 'bootstrap'
    ]
  },
  {
    id: 'ntecnologias',
    title: 'Desenvolvedor Full Stack',
    company: 'NTecnologias',
    period: 'Atualmente',
    short: 'Desenvolvimento em soluções para gestão de logística.',
    description: [
      'Desenvolvimento de soluções para otimização de processos logísticos.',
      'Implementação de sistemas de rastreamento de entregas e gerenciamento de estoque.',
      'Integração com APIs de transporte e logística para melhoria na eficiência operacional.',
      'Migração de projetos antigos para tecnologias novas',
      'Configurações de ambientes de desenvolvimento e produção no Azure',
      'Participação em reuniões de planejamento e revisão de sprints.',
      'Migração de funcionalidades de um ERP antigo para outro ERP mais novo.'
    ],
    tech: ['dotnet', 'csharp', 'azuredevops', 'sqlserver', 'mysql', 'git', 'postman', 'javascript', 'bootstrap', 'angular']
  }
];

export default function ProjetosPage() {
  return (
    <>
      <BackgroundCircuit />
      <main id="projetos" className={styles.container}>
        <section className={styles.wrap}>
          <h1 className={styles.title}>Projetos</h1>
          <br />
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