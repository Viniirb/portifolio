import styles from "./Home.module.css";
import BackgroundCircuit from "@/components/BackgroundCircuit/BackgroundCircuit";
import React from "react";

export default function Home() {
  return (
    <>
      <BackgroundCircuit />
      <main className={`${styles.container} animate__animated animate__fadeIn ${styles.animMain}`}>
        <h1 className={`${styles.title} animate__animated animate__fadeInDown ${styles.animTitle}`}>
          Bem-vindo ao meu Portifólio
        </h1>

        <p className={`${styles.subtitle} animate__animated animate__fadeInUp ${styles.animSubtitle}`}>
          Olá, eu sou Vinícius Barbosa, um desenvolvedor apaixonado por criar
          experiências web incríveis.
        </p>
      </main>
    </>
  );
}