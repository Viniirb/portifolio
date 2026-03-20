export interface StackItem {
  name: string
  icon: string
  color: string
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools'
}

export const stackCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database & Dados',
  devops: 'DevOps & Plataforma',
  tools: 'Ferramentas',
} as const

export const stack: StackItem[] = [
  // Frontend
  { name: 'React', icon: '/tech/react.svg', color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', icon: '/tech/nextdotjs.svg', color: '#AAAAAA', category: 'frontend' },
  { name: 'TypeScript', icon: '/tech/typescript.svg', color: '#3178C6', category: 'frontend' },
  { name: 'JavaScript', icon: '/tech/javascript.svg', color: '#F7DF1E', category: 'frontend' },
  { name: 'Vue.js', icon: '/tech/vuejs.svg', color: '#4FC08D', category: 'frontend' },
  // Backend
  { name: 'C# / .NET', icon: '/tech/dotnet.svg', color: '#512BD4', category: 'backend' },
  { name: 'Node.js', icon: '/tech/nodejs.svg', color: '#339933', category: 'backend' },
  { name: 'GraphQL', icon: '/tech/graphql.svg', color: '#E10098', category: 'backend' },
  { name: 'Python', icon: '/tech/python.svg', color: '#3776AB', category: 'backend' },
  // Mobile
  { name: 'Ionic', icon: '/tech/ionic.svg', color: '#3880FF', category: 'mobile' },
  { name: 'React Native', icon: '/tech/react.svg', color: '#61DAFB', category: 'mobile' },
  // Database
  { name: 'SQL Server', icon: '/tech/microsoftsqlserver.svg', color: '#CC2927', category: 'database' },
  { name: 'PostgreSQL', icon: '/tech/postgresql.svg', color: '#4169E1', category: 'database' },
  { name: 'MySQL', icon: '/tech/mysql.svg', color: '#4479A1', category: 'database' },
  { name: 'Supabase', icon: '/tech/supabase.svg', color: '#3ECF8E', category: 'database' },
  // DevOps
  { name: 'Azure DevOps', icon: '/tech/azuredevops.svg', color: '#0078D7', category: 'devops' },
  { name: 'Docker', icon: '/tech/docker.svg', color: '#2496ED', category: 'devops' },
  { name: 'n8n', icon: '/tech/n8n.svg', color: '#EA4B71', category: 'devops' },
  // Tools
  { name: 'Git', icon: '/tech/git.svg', color: '#F05032', category: 'tools' },
  { name: 'Postman', icon: '/tech/postman.svg', color: '#FF6C37', category: 'tools' },
  { name: 'VS Code', icon: '/tech/vscode.svg', color: '#007ACC', category: 'tools' },
]
