import BackgroundCircuit from "@/components/BackgroundCircuit/BackgroundCircuit";
import styles from "./Sobre.module.css";
import SkillBar from "@/components/SkillBar/SkillBar";

export default function Sobre() {
  const skills = [
    { name: "JavaScript / TypeScript", value: 88 },
    { name: "React / Next.js", value: 90 },
    { name: "Node.js", value: 72 },
    { name: "C# / .NET", value: 100 },
    { name: "Banco de Dados", value: 100 },
    { name: "Azure DevOps", value: 100 },
    { name: "Git", value: 100 },
    { name: "Linux", value: 80 },
    { name: "CI/CD ", value: 90 },
    { name: "Testes", value: 90 },
  ];

  const curiosidades = [
    "Amo estudar 📚​",
    "Gosto cozinhar 🍳",
    "Amo ler histórias em quadrinhos 📖",
    "Gosto de jogar videogame 🎮",
    "Gosto de viajar ✈️",
    "Gosto de aprender coisas novas 🌱"
  ];

  const bioText =
    "Desenvolvedor fullstack há 5 anos, com foco em .NET/C# e front‑ends modernos com React e Next.js. No back‑end, projeto APIs e integrações performantes com SQL Server, MySQL, Oracle e Dapper. Experiência com Azure DevOps e CI/CD para entregas estáveis e previsíveis. Autista (TEA), minha organização e atenção a padrões elevam a qualidade técnica e a comunicação; valorizo documentação, acessibilidade, testes e melhoria contínua. Vamos conversar sobre como posso contribuir com seu time ou projeto.";

  return (
    <>
    <BackgroundCircuit />
      <main className={styles.container}>
        <div className={styles.wrap}>
          <section className={`${styles.card} animate__animated animate__fadeInUp ${styles.cardEnter}`}>
            <h1 className={styles.title}>Sobre Mim</h1>
            <div className={styles.bio}>
              {bioText.split(". ").map((sent, i, arr) => (
                <span key={i}>
                  {sent.trim()}
                  {i < arr.length - 1 ? "." : ""}
                  <br />
                </span>
              ))}
            </div>
          </section>

          <section className={`${styles.card} animate__animated animate__fadeInUp ${styles.cardEnterDelay80}`}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skillsGrid}>
              {skills.map((s) => (
                <SkillBar key={s.name} label={s.name} value={s.value} />
              ))}
            </div>
          </section>

          <section className={`${styles.card} animate__animated animate__fadeInUp ${styles.cardEnterDelay160}`}>
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
        </div>
      </main>
    </>
  );
}