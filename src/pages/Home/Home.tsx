import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.text}>
        <p>Bem-vindo ao meu mundo criativo!🪐</p>
        <p>Neste espaço, você descobrirá tudo o que há para saber sobre mim, minhas habilidades e projetos.</p>
        <p>Vamos embarcar juntos nessa jornada!</p>
      </div>
    </div>
  );
};

export default Home;
