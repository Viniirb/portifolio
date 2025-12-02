"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 1000;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition * (1 - ease));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <motion.footer
      className="border-t border-border/40 bg-background/80 backdrop-blur-lg relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Botão Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        aria-label="Voltar ao topo"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.div>
      </motion.button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vinicius Rolim Barbosa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default React.memo(Footer);
