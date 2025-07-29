// app/sobre/page.tsx
import styles from "./Sobre.module.css";

export default function SobrePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sobre Mim</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>Biografia</h2>
        <p className={styles.text}>
          Sou um desenvolvedor apaixonado por criar experiências únicas na web...
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Habilidades</h2>
        <ul className={styles.list}>
          <li>JavaScript / TypeScript</li>
          <li>React / Next.js</li>
          <li>Node.js</li>
          <li>Banco de Dados</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Experiências</h2>
        <div className={styles.experiencia}>
          <strong>Empresa X</strong> - Desenvolvedor Frontend (2022 - atual)
          <p>Responsável por criar interfaces modernas e animadas.</p>
        </div>
        <div className={styles.experiencia}>
          <strong>Empresa Y</strong> - Estágio (2021 - 2022)
          <p>Participação em projetos internos de automação.</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Curiosidades</h2>
        <ul className={styles.list}>
          <li>Sou fanático por design retrô</li>
          <li>Adoro desafios com CSS e SVG</li>
          <li>Gosto de xadrez e jogos lógicos</li>
        </ul>
      </section>
    </main>
  );
}
