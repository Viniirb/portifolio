import React from 'react';
import style from  './Footer.module.css'; // Importa o CSS do Footer

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className="footer-content">
        <p>© 2024 Vinicius Rolim Barbosa - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
