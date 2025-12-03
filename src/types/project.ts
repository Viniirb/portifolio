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
  | "mysql";

export type Project = {
  id: string;
  title: string;
  company: string;
  period?: string;
  short: string;
  description: string[];
  tech: TechKey[];
  links?: { repo?: string; demo?: string };
};
