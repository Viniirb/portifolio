import BackgroundCircuit from "@/components/BackgroundCircuit/BackgroundCircuit";
import styles from "./Sobre.module.css";
import SkillBar from "@/components/SkillBar/SkillBar";

export default function Sobre() {
  const skills = [
    { name: "JavaScript / TypeScript", value: 88 },
    { name: "React / Next.js", value: 85 },
    { name: "Node.js", value: 72 },
    { name: "Banco de Dados", value: 65 },
    { name: "CSS / SVG", value: 90 },
  ];

  const curiosidades = [
    "Sou fanático por design retrô.",
    "Adoro desafios criativos com CSS e SVG.",
    "Gosto de xadrez e jogos lógicos.",
  ];

  return (
    <>
      <BackgroundCircuit />
      <main className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>Sobre Mim</h1>

          <div className={styles.bio}>
            {`Desenvolvedor fullstack há 5 anos, com foco em .NET/C# e front‑ends modernos com React e Next.js. No back‑end, projeto APIs e integrações performantes com SQL Server, MySQL, Oracle e Dapper. Experiência com Azure DevOps e CI/CD para entregas estáveis e previsíveis. Autista (TEA), minha organização e atenção a padrões elevam a qualidade técnica e a comunicação; valorizo documentação, acessibilidade, testes e melhoria contínua. Vamos conversar sobre como posso contribuir com seu time ou projeto.`
              .split(". ")
              .map((sent, i, arr) => (
                <span key={i}>
                  {sent.trim()}
                  {i < arr.length - 1 ? "." : ""}
                  <br />
                </span>
              ))}
          </div>

          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((s) => (
              <SkillBar key={s.name} label={s.name} value={s.value} />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Curiosidades</h2>
          <ul className={styles.list}>
            {curiosidades.map((c, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.bullet} />
                {c}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}