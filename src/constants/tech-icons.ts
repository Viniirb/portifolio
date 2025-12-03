import type { TechKey } from "@/types";

export const techIcons: Record<
  TechKey,
  { src: string; alt: string }
> = {
  react: { src: "/tech/react.svg", alt: "React" },
  nextjs: { src: "/tech/nextdotjs.svg", alt: "Next.js" },
  typescript: { src: "/tech/typescript.svg", alt: "TypeScript" },
  node: { src: "/tech/nodejs.svg", alt: "Node.js" },
  dotnet: { src: "/tech/dotnet.svg", alt: ".NET" },
  csharp: { src: "/tech/csharp.svg", alt: "C#" },
  sqlserver: { src: "/tech/microsoftsqlserver.svg", alt: "SQL Server" },
  azuredevops: { src: "/tech/azuredevops.svg", alt: "Azure DevOps" },
  vue: { src: "/tech/vuejs.svg", alt: "Vue.js" },
  jira: { src: "/tech/jira.svg", alt: "Jira" },
  postman: { src: "/tech/postman.svg", alt: "Postman" },
  git: { src: "/tech/git.svg", alt: "Git" },
  javascript: { src: "/tech/javascript.svg", alt: "JavaScript" },
  bitbucket: { src: "/tech/bitbucket.svg", alt: "Bitbucket" },
  angular: { src: "/tech/angular.svg", alt: "Angular" },
  bootstrap: { src: "/tech/bootstrap.svg", alt: "Bootstrap" },
  styledcomponents: { src: "/tech/styledcomponents.svg", alt: "Styled Components" },
  minio: { src: "/tech/minio.svg", alt: "MinIO" },
  dotenv: { src: "/tech/dotenv.svg", alt: "Dotenv" },
  graphql: { src: "/tech/graphql.svg", alt: "GraphQL" },
  vscode: { src: "/tech/vscode.svg", alt: "Visual Studio Code" },
  mysql: { src: "/tech/mysql.svg", alt: "MySQL" },
};

export const whiteIconTechs: TechKey[] = [
  "vue",
  "typescript",
  "dotnet",
  "git",
  "javascript",
  "angular",
  "bootstrap",
  "jira",
  "bitbucket",
  "styledcomponents",
  "minio",
  "dotenv",
  "graphql",
  "react",
  "nextjs",
];
