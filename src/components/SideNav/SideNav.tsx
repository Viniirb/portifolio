// Sidenav.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './Sidenav.module.css';
import { Link } from 'react-router-dom'; // Usando react-router-dom para navegação

const Sidenav: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        <FaTimes size={30} color="white" />
      </button>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/sobre" onClick={onClose}>Sobre Mim</Link>
          </li>
          <li>
            <Link to="/projetos" onClick={onClose}>Projetos</Link>
          </li>
          <li>
            <Link to="/menu" onClick={onClose}>Menu</Link>
          </li>
          <li>
            <Link to="/contato" onClick={onClose}>Contato</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
