'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

export const techIcons = {
  react:       { src: '/tech/react.svg',       alt: 'React' },
  nextjs:      { src: '/tech/nextdotjs.svg',      alt: 'Next.js' },
  typescript:  { src: '/tech/typescript.svg',  alt: 'TypeScript' },
  node:        { src: '/tech/nodejs.svg',      alt: 'Node.js' },
  dotnet:      { src: '/tech/dotnet.svg',      alt: '.NET' },
  csharp:      { src: '/tech/csharp.svg',      alt: 'C#' },
  sqlserver:   { src: '/tech/microsoftsqlserver.svg',   alt: 'SQL Server' },
  azuredevops: { src: '/tech/azuredevops.svg', alt: 'Azure DevOps' },
  vue:         { src: '/tech/vuejs.svg',         alt: 'Vue.js' },
  jira:        { src: '/tech/jira.svg',       alt: 'Jira' },
  postman:     { src: '/tech/postman.svg',    alt: 'Postman' },
  git:         { src: '/tech/git.svg',        alt: 'Git' },
  javascript:  { src: '/tech/javascript.svg',  alt: 'JavaScript' },
  bitbucket:   { src: '/tech/bitbucket.svg',   alt: 'Bitbucket' },
  angular:     { src: '/tech/angular.svg',    alt: 'Angular' },
  bootstrap:   { src: '/tech/bootstrap.svg',   alt: 'Bootstrap' },
  styledcomponents: { src: '/tech/styledcomponents.svg', alt: 'Styled Components' },
  minio: { src: '/tech/minio.svg', alt: 'MinIO' },
  dotenv: { src: '/tech/dotenv.svg', alt: 'Dotenv' },
  graphql: { src: '/tech/graphql.svg', alt: 'GraphQL' },
  vscode: { src: '/tech/vscode.svg', alt: 'Visual Studio Code' },
  mysql: { src: '/tech/mysql.svg', alt: 'MySQL' }
} as const;

export type TechKey = keyof typeof techIcons;

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

type Props = {
  project: Project;
  className?: string;
};

import ReactDOM from 'react-dom';

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Fechar modal">×</button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default function ProjectCard({ project, className }: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const improvedDescription = project.description.map((para) => para.trim());

  return (
    <article className={`${styles.card} animate__animated animate__fadeInUp ${className ?? ''}`}>
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.meta}>
            <span className={styles.company}>{project.company}</span>
            {project.period ? <span className={styles.dot} aria-hidden>•</span> : null}
            {project.period ? <span className={styles.period}>{project.period}</span> : null}
          </div>
          <p className={styles.short}>{project.short}</p>
        </div>

        <button
          type="button"
          className={styles.btn}
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
        >
          Detalhes
        </button>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Descrição</h4>
            {improvedDescription.map((para, i) => (
              <p key={i} className={styles.desc}>{para}</p>
            ))}
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Tecnologias</h4>
            <ul className={styles.techList}>
              {project.tech.map((t) => {
                const icon = techIcons[t];
                if (!icon) return null;
                return (
                  <li
                    key={t}
                    className={`${styles.techItem} ${(t === 'vue' || t === 'typescript' || t === 'dotnet' || t === 'git'
                      || t === 'javascript' || t === 'angular' || t === 'bootstrap' || t === 'jira' || t === 'bitbucket' || t === 'styledcomponents'
                      || t === 'minio' || t === 'dotenv' || t === 'graphql' || t === 'react' || t === 'nextjs'
                    ) ? styles.whiteIcon : ''}`}
                    title={icon.alt}
                  >
                    <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                    <span className={styles.techLabel}>{icon.alt}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {project.links && (project.links.repo || project.links.demo) && (
            <div className={styles.actions}>
              {project.links.repo && (
                <a className={styles.btn} href={project.links.repo} target="_blank" rel="noreferrer noopener">
                  Repositório
                </a>
              )}
              {project.links.demo && (
                <a className={styles.btn} href={project.links.demo} target="_blank" rel="noreferrer noopener">
                  Demo
                </a>
              )}
            </div>
          )}
        </Modal>
      )}
    </article>
  );
}