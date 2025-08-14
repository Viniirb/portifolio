'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

export const techIcons = {
  react:       { src: '/tech/react.svg',       alt: 'React' },
  nextjs:      { src: '/tech/nextjs.svg',      alt: 'Next.js' },
  typescript:  { src: '/tech/typescript.svg',  alt: 'TypeScript' },
  node:        { src: '/tech/nodejs.svg',      alt: 'Node.js' },
  dotnet:      { src: '/tech/dotnet.svg',      alt: '.NET' },
  csharp:      { src: '/tech/csharp.svg',      alt: 'C#' },
  sqlserver:   { src: '/tech/microsoftsqlserver.svg',   alt: 'SQL Server' },
  azuredevops: { src: '/tech/azuredevops.svg', alt: 'Azure DevOps' },
  docker:      { src: '/tech/docker.svg',      alt: 'Docker' },
  dapper:      { src: '/tech/dapper.svg',      alt: 'Dapper' },
  vue:         { src: '/tech/vuejs.svg',         alt: 'Vue.js' },
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

export default function ProjectCard({ project, className }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = React.useState(0);

  React.useEffect(() => {
    if (expanded && contentRef.current) {
      setMaxH(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  React.useEffect(() => {
    if (!expanded) return;
    const onResize = () => setMaxH(contentRef.current?.scrollHeight ?? 0);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [expanded]);

  const detailsId = `details-${project.id}`;

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
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Fechar' : 'Detalhes'}
        </button>
      </div>

      <div
        id={detailsId}
        ref={contentRef}
        className={`${styles.details} ${expanded ? styles.expanded : ''}`}
        style={{ maxHeight: expanded ? maxH : 0 }}
      >
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Descrição</h4>
          {project.description.map((para, i) => (
            <p key={i} className={styles.desc}>{para}</p>
          ))}
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Tecnologias</h4>
          <ul className={styles.techList}>
            {project.tech.map((t) => {
              const icon = techIcons[t];
              return (
                <li key={t} className={styles.techItem} title={icon.alt}>
                  <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                  <span className={styles.techLabel}>{icon.alt}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {project.links && (project.links.repo || project.links.demo) ? (
          <div className={styles.actions}>
            {project.links.repo ? (
              <a className={styles.btn} href={project.links.repo} target="_blank" rel="noreferrer noopener">
                Repositório
              </a>
            ) : null}
            {project.links.demo ? (
              <a className={styles.btn} href={project.links.demo} target="_blank" rel="noreferrer noopener">
                Demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}