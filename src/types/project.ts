export type TechKey =
  | "react"
  | "nextjs"
  | "typescript"
  | "node"
  | "dotnet"
  | "csharp"
  | "sqlserver"
  | "azuredevops"
  | "vue"
  | "jira"
  | "postman"
  | "git"
  | "javascript"
  | "bitbucket"
  | "angular"
  | "bootstrap"
  | "styledcomponents"
  | "minio"
  | "dotenv"
  | "graphql"
  | "vscode"
  | "mysql"
  | "supabase"
  | "postgresql"
  | "docker"
  | "n8n"
  | "ionic"
  | "python";

export type Project = {
  id: string;
  title: string;
  company: string;
  period?: string;
  short: string;
  description: string[];
  tech: TechKey[];
};
