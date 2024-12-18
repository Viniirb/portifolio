// src/main.tsx (ou src/index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';  // Usando o React 18
import App from './App';  // Certifique-se de que o caminho para o componente App está correto

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Criação da raiz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
