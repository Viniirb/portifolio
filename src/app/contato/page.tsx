// app/contato/page.tsx
"use client";
import BackgroundCircuit from "@/components/BackgroundCircuit/BackgroundCircuit";
import styles from "./Contato.module.css";
import MapEmbed from "@/components/MapEmbed/MapEmbed";

function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

export default function App() {
  const enderecoLinha = "Rua Aquino Manoel Quintino, 536, Floresta, Joinville, SC, 89212-180";

  const wpMsg = encodeURIComponent("Olá Vinícius! Cheguei pelo seu portfólio e gostaria de conversar.");
  const contatos = [
    {
      label: "WhatsApp",
      value: "+55 (47) 98890-3621",
      href: `https://wa.me/5547988903621?text=${wpMsg}`,
      copy: "+55 47 98890-3621",
    },
    {
      label: "Email",
      value: "viiniirb@proton.me",
      href: `mailto:viiniirb@proton.me?subject=${encodeURIComponent("Contato via portfólio")}&body=${encodeURIComponent("Olá Vinícius, tudo bem? Vi seu portfólio e gostaria de falar sobre...")}`,
      copy: "viiniirb@proton.me",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/vinicius-rolim-barbosa-15b066374",
      href: "https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/",
      copy: "https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/",
    },
    {
      label: "GitHub",
      value: "github.com/Viniirb",
      href: "https://github.com/Viniirb",
      copy: "https://github.com/Viniirb",
    },
  ];

  return (
    <>
    <BackgroundCircuit />
      <main className={styles.container}>
        <section className={`${styles.card} animate__animated animate__fadeIn ${styles.cardEnter}`}>
          <h1 className={styles.title}>Contato</h1>
          <p className={styles.subtitle}>
            Fique à vontade para me chamar por qualquer canal abaixo. Normalmente respondo no mesmo dia.
          </p>

          <div className={styles.grid}>
            <div>
              <h2 className={styles.sectionTitle}>Canais</h2>
              <ul className={styles.list}>
                {contatos.map((c) => (
                  <li key={c.label} className={styles.listItem}>
                    <span className={styles.bullet} />
                    <span className={styles.label}>{c.label}:</span>
                    <a className={styles.link} href={c.href} target="_blank" rel="noreferrer noopener">
                      {c.value}
                    </a>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.copyBtn}`}
                      onClick={() => copyToClipboard(c.copy)}
                      aria-label={`Copiar ${c.label}`}
                    >
                      Copiar
                    </button>
                  </li>
                ))}
              </ul>

              <h2 className={styles.sectionTitle}>Endereço</h2>
              <p className={styles.address}>{enderecoLinha}</p>
              <div className={styles.actionRow}>
                <a
                  className={styles.btn}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enderecoLinha)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Ver rota
                </a>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <MapEmbed address={enderecoLinha} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}