import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import SideNav from '../SideNav/SideNav';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Estado inicial fechado

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Meu Portfólio</h1>
      <button 
        className={styles.menuIcon} 
        onClick={toggleNav} 
        aria-label={isNavOpen ? "Fechar menu" : "Abrir menu"} // Melhora a acessibilidade
      >
        <FiMenu />
      </button>
      <SideNav isOpen={isNavOpen} onClose={toggleNav} />
    </header>
  );
};

export default Header;
