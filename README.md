# 💼 Portfólio Profissional - Vinicius Rolim Barbosa

<div align="center">

Portfólio pessoal desenvolvido com Next.js 15, apresentando projetos, certificações e experiência profissional de forma minimalista e moderna.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[![Deploy Status](https://img.shields.io/badge/Vercel-Deployed-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/Viniirb/portifolio/pulls)

[🌐 Ver Demo](https://seu-portfolio.vercel.app) · [📝 Reportar Bug](https://github.com/Viniirb/portifolio/issues) · [✨ Solicitar Feature](https://github.com/Viniirb/portifolio/issues)

</div>

---

## 🎯 Sobre o Projeto

Portfólio full-stack desenvolvido para apresentar minha trajetória profissional como desenvolvedor, incluindo projetos, stack tecnológica e mais de 30 certificações. O design segue uma abordagem **minimalista e profissional**, inspirado em interfaces modernas, com foco em **experiência do usuário** e **performance**.

<details>
<summary><strong>🎨 Preview</strong></summary>
<br>

> Em breve: Screenshots do projeto

</details>

### ✨ Características Principais

| Feature | Descrição |
|---------|-----------|
| 🎨 **Design Minimalista** | Interface limpa e moderna com tema escuro fixo |
| 📱 **Totalmente Responsivo** | Adaptado para desktop, tablet e mobile |
| ⚡ **Animações Suaves** | Transições fluidas com Framer Motion |
| 🎯 **SPA com Scroll** | Navegação intuitiva por scroll entre seções |
| 🎓 **33 Certificações** | Filtros por categoria (Cibersegurança, Cloud, etc) |
| 💼 **4 Projetos Profissionais** | Experiências detalhadas com modal expansível |
| 🚀 **Performance** | Next.js 15 com Turbopack para builds ultra-rápidos |
| ♿ **Acessibilidade** | Desenvolvido seguindo práticas WCAG |
| 🎭 **Scrollbar Customizada** | Barra de rolagem minimalista de 6px |
| 🔝 **Scroll to Top** | Botão flutuante para voltar ao início |

## 🛠️ Stack Tecnológica

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- ⚛️ **React 19** - Biblioteca UI
- 🔷 **Next.js 15.4.4** - Framework React
- 📘 **TypeScript** - Tipagem estática
- 🎨 **Tailwind CSS 3.4** - Utility-first CSS
- 🎭 **Framer Motion 11** - Animações
- 🖼️ **next/font** - Otimização de fontes
- 🎯 **Lucide React** - Ícones modernos

</td>
<td valign="top" width="50%">

### DevTools
- 📦 **Turbopack** - Bundler rápido
- 🔍 **ESLint** - Linting de código
- 🎨 **PostCSS** - Processamento CSS
- 🔧 **TypeScript 5** - Compilador TS
- 🚀 **Vercel** - Deploy e hosting
- 📝 **Git** - Controle de versão

</td>
</tr>
</table>

## 📂 Estrutura do Projeto

```
📦 portifolio/
┣ 📂 src/
┃ ┣ 📂 app/
┃ ┃ ┣ 📄 page.tsx              # 🏠 Home (SPA com todas as seções)
┃ ┃ ┣ 📄 layout.tsx            # 🎨 Layout raiz
┃ ┃ ┣ 📄 globals.css           # 🎨 Estilos globais
┃ ┃ ┣ 📂 sobre/                # 👤 Página Sobre (alternativa)
┃ ┃ ┣ 📂 projetos/             # 💼 Página Projetos (alternativa)
┃ ┃ ┣ 📂 certificacoes/        # 🎓 Página Certificações (alternativa)
┃ ┃ ┗ 📂 contato/              # 📧 Página Contato (alternativa)
┃ ┣ 📂 components/
┃ ┃ ┣ 📂 features/
┃ ┃ ┃ ┗ 📂 ProjectCard/        # 💼 Card de projeto + modal
┃ ┃ ┗ 📂 layout/
┃ ┃   ┣ 📂 Header/             # 🔝 Cabeçalho fixo translúcido
┃ ┃   ┗ 📂 Footer/             # ⬇️ Rodapé + scroll-to-top
┃ ┣ 📂 constants/
┃ ┃ ┣ 📄 projects.ts           # 💼 Dados dos projetos
┃ ┃ ┣ 📄 certifications.ts     # 🎓 Dados das certificações
┃ ┃ ┗ 📄 tech-icons.ts         # 🔧 Ícones de tecnologias
┃ ┗ 📂 types/
┃   ┣ 📄 project.ts            # 📝 Tipos para projetos
┃   ┗ 📄 certification.ts      # 📝 Tipos para certificações
┣ 📂 public/
┃ ┗ 📂 tech/                   # 🎨 Ícones SVG de tecnologias
┗ 📄 package.json
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Viniirb/portifolio.git
cd portifolio
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Build para Produção

```bash
npm run build
npm start
```

## 📄 Seções do Portfólio

<table>
<tr>
<td width="50%">

### 🏠 Home
Seção inicial com apresentação profissional, nome e descrição. Inclui:
- Animação de scroll suave
- Efeito de gradiente de fundo
- Seta animada para próxima seção

### 👨‍💻 Sobre Mim
- 📍 **Localização**: Rio Verde, MS → Joinville, SC
- 🎓 **Formação**: Ciência da Computação (UNISOCIESC - 2027)
- 💼 **Experiência**: 5 anos como desenvolvedor fullstack
- 🎯 **10 Habilidades** com níveis de proficiência
- 🎨 **6 Interesses** pessoais

### 💼 Projetos
**4 Experiências Profissionais** detalhadas:
- 🔵 **NTecnologias** (Atual) - Full Stack
- 🟣 **Blump-LTDA** (2024) - Full Stack
- 🟢 **Eos Systems** (2023-2024) - Web Dev
- 🟡 **Inovvati** (2021-2023) - Junior Dev

</td>
<td width="50%">

### 🎓 Certificações
**33 Certificações** organizadas:

| Categoria | Quantidade |
|-----------|------------|
| 🛡️ Cibersegurança | 19 certs |
| 💻 Desenvolvimento | 8 certs |
| ☁️ Cloud | 2 certs |
| 🌐 Redes | 2 certs |
| ⚙️ Outros | 2 certs |

<details>
<summary><strong>🎨 Customizar Cores e Tema</strong></summary>

As cores são definidas em `src/app/globals.css` usando CSS custom properties:

```css
.dark {
  --background: 0 0% 6%;
  --foreground: 0 0% 96%;
  --primary: 0 0% 96%;
  --border: 0 0% 16%;
  /* ... mais variáveis */
}
```

</details>

<details>
<summary><strong>💼 Adicionar Novos Projetos</strong></summary>

Edite `src/constants/projects.ts`:

```typescript
{
  id: "meu-projeto",
  title: "Nome do Projeto",
  company: "Empresa XYZ",
  period: "2024 — 2025",
  short: "Descrição curta do projeto",
  description: [
    "Parágrafo detalhado 1",
    "Parágrafo detalhado 2",
    "Parágrafo detalhado 3"
  ],
  tech: ["react", "nextjs", "typescript", "tailwind"],
  links: {
    repo: "https://github.com/...",
    demo: "https://..."
  }
}
```

</details>

<details>
<summary><strong>🎓 Adicionar Certificações</strong></summary>

Edite `src/constants/certifications.ts`:

```typescript
{
  id: "cert-id",
  title: "Nome da Certificação",
  institution: "Instituição",
  date: "01/12/2025",
  image: "",
  category: "development" // ou cybersecurity, cloud, networking, other
}
```

</details>itle: "Título do Projeto",

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Viniirb/portifolio)

</div>

**Passos:**
1. 🔗 Conecte seu repositório GitHub
2. ⚙️ Configure as variáveis de ambiente (se necessário)
3. 🚀 Deploy automático a cada push

### Outras Plataformas

| Plataforma | Status | Documentação |
|------------|--------|--------------|
| **Netlify** | ✅ Suportado | [Docs](https://docs.netlify.com/integrations/frameworks/next-js/) |
<div align="center">

<img src="https://github.com/Viniirb.png" width="100" style="border-radius: 50%"/>

### Vinicius Rolim Barbosa
**Desenvolvedor Full Stack | Ciência da Computação**

Rio Verde, MS 🏠 Joinville, SC

<br />

[![GitHub](https://img.shields.io/badge/GitHub-Viniirb-181717?style=for-the-badge&logo=github)](https://github.com/Viniirb)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vinicius--rolim--barbosa-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/)
[![Email](https://img.shields.io/badge/Email-viiniirb@proton.me-8B89CC?style=for-the-badge&logo=protonmail&logoColor=white)](mailto:viiniirb@proton.me)

</div>

---

## 🙏 Agradecimentos

<table>
<tr>
<td align="center">
  <img src="https://img.shields.io/badge/Design-Echelon-FF6B6B?style=for-the-badge" /><br />
  Design inspirado em <a href="https://echelon.framer.media/">Echelon</a>
</td>
<td align="center">
  <img src="https://img.shields.io/badge/Icons-Lucide-F56565?style=for-the-badge" /><br />
  Ícones por <a href="https://lucide.dev/">Lucide</a>
</td>
<td align="center">
  <img src="https://img.shields.io/badge/Tech_Icons-Simple_Icons-111111?style=for-the-badge" /><br />
  SVGs por <a href="https://simpleicons.org/">Simple Icons</a>
</td>
</tr>
</table>

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

**Made with ❤️ by [Vinicius Rolim Barbosa](https://github.com/Viniirb)**

[🔝 Voltar ao topo](#-portfólio-profissional---vinicius-rolim-barbosa)

</div>CENSE) para mais detalhes.

```
MIT License - Copyright (c) 2025 Vinicius Rolim Barbosa
```
  institution: "Instituição",
  date: "01/01/2025",
  image: "",
  category: "development",
}
```

## 🌐 Deploy

### Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Viniirb/portifolio)

1. Faça push do código para o GitHub
2. Importe o projeto na Vercel
3. Deploy automático configurado

### Outras Plataformas
- **Netlify**: Suporte completo a Next.js
- **Railway**: Deploy com Docker
- **AWS Amplify**: Integração com AWS

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Vinicius Rolim Barbosa**

- GitHub: [@Viniirb](https://github.com/Viniirb)
- LinkedIn: [vinicius-rolim-barbosa](https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/)
- Email: contato@viniciusrb.dev
- Localização: Joinville, SC - Brasil

## 🙏 Agradecimentos

- Design inspirado em [Echelon](https://echelon.framer.media/)
- Ícones por [Lucide](https://lucide.dev/)
- SVGs de tecnologias por [Simple Icons](https://simpleicons.org/)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

