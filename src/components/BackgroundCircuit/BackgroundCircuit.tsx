'use client';
import React from "react";

const BackgroundCircuit = () => {
  return (
    <div className="background">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        {/* Linhas do circuito */}
        <path className="circuitLine" d="M100 300 H300 V100 H500 V300 H700" />
        <path className="circuitLine" d="M300 100 V500 H500 V400" />
        <path className="circuitLine" d="M100 300 V500 H300" />

        {/* Nós/pontos do circuito */}
        <circle className="circuitNode" cx="100" cy="300" r="5" />
        <circle className="circuitNode" cx="300" cy="100" r="5" />
        <circle className="circuitNode" cx="500" cy="100" r="5" />
        <circle className="circuitNode" cx="700" cy="300" r="5" />
        <circle className="circuitNode" cx="300" cy="500" r="5" />
        <circle className="circuitNode" cx="500" cy="400" r="5" />
      </svg>
    </div>
  );
};

export default BackgroundCircuit;
