'use client'
import { motion } from 'framer-motion'

export function Hero() {
    return (
    <section className="w-full min-h-[80vh] flex flex-col border-b border-corporate-border">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full flex-1">
            <div className="md:col-span-8 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-corporate-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-sm font-bold tracking-widest text-foreground/60 uppercase mb-4">
                  Full Stack Developer
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-8">
                  SOLUÇÕES COMPLEXAS <br />
                  DESIGN & CÓDIGO.
                </h1>
                <p className="text-lg text-foreground/70 max-w-xl leading-relaxed">
                  Especialista em construir arquiteturas escaláveis e interfaces performáticas.
                  Transformando requisitos técnicos em produtos digitais robustos.
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-4 grid grid-rows-2">
              <div className="p-8 border-b border-corporate-border flex flex-col justify-center bg-corporate-gray/30">
                <h3 className="text-4xl font-bold mb-2">30+</h3>
                <p className="text-sm text-foreground/60 uppercase">Certificações Técnicas</p>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-4xl font-bold mb-2">5 Anos</h3>
                <p className="text-sm text-foreground/60 uppercase">Experiência de Mercado</p>
              </div>
            </div>
      </div>
      <div className="w-full bg-foreground text-background p-4 text-center text-sm font-mono uppercase tracking-widest">
        Disponível para novos projetos
      </div>
    </section>
    )
}