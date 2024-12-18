import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importando o Router
import Header from './components/Header/Header';
import Sidenav from './components/SideNav/SideNav';
import Footer from './components/Footer/Footer';
import AboutMe from './pages/AboutMe/AboutMe'; // Exemplo de página
import Projects from './pages/Projects/Projects'; // Exemplo de página
import Contact from './pages/Contact/Contact'; // Exemplo de página
import Home from './pages/Home/Home'; // Página inicial com a mensagem
import styles from './App.module.css';

const App: React.FC = () => {
  const [isSidenavOpen, setSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen);
  };

  return (
    <Router> {/* Envolvendo a aplicação com o Router */}
      <Header />
      <Sidenav isOpen={isSidenavOpen} onClose={toggleSidenav} />
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes> {/* Definindo as rotas */}
            <Route path="/" element={<Home />} /> {/* Página inicial com a mensagem */}
            <Route path="/sobre" element={<AboutMe />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
