export interface StackItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools'
}

export const stackCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Ferramentas',
} as const

export const stack: StackItem[] = [
  { name: 'React', icon: '/tech/react.svg', category: 'frontend' },
  { name: 'Next.js', icon: '/tech/nextdotjs.svg', category: 'frontend' },
  { name: 'TypeScript', icon: '/tech/typescript.svg', category: 'frontend' },
  { name: 'JavaScript', icon: '/tech/javascript.svg', category: 'frontend' },
  { name: 'Vue.js', icon: '/tech/vuejs.svg', category: 'frontend' },
  { name: 'Angular', icon: '/tech/angular.svg', category: 'frontend' },
  { name: 'C# / .NET', icon: '/tech/dotnet.svg', category: 'backend' },
  { name: 'Node.js', icon: '/tech/nodejs.svg', category: 'backend' },
  { name: 'GraphQL', icon: '/tech/graphql.svg', category: 'backend' },
  { name: 'SQL Server', icon: '/tech/microsoftsqlserver.svg', category: 'database' },
  { name: 'MySQL', icon: '/tech/mysql.svg', category: 'database' },
  { name: 'MinIO', icon: '/tech/minio.svg', category: 'database' },
  { name: 'Azure DevOps', icon: '/tech/azuredevops.svg', category: 'devops' },
  { name: 'Git', icon: '/tech/git.svg', category: 'tools' },
  { name: 'Postman', icon: '/tech/postman.svg', category: 'tools' },
  { name: 'VS Code', icon: '/tech/vscode.svg', category: 'tools' },
  { name: 'Jira', icon: '/tech/jira.svg', category: 'tools' },
]
