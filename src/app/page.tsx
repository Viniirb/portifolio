import styles from "./Home.module.css";
import BackgroundCircuit from "@/components/BackgroundCircuit/BackgroundCircuit";

export default function Home() {
  return (
    <>
      <BackgroundCircuit />
      <main className={styles.container}>
        <h1 className={styles.title}>Bem-vindo ao meu Portifólio</h1>
        <p className={styles.subtitle}>
          Olá, eu sou Vinícius Barbosa, um desenvolvedor apaixonado por criar
          experiências web incríveis.
        </p>
      </main>  
    </>
  );
}
