'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface SpeedVector {
  x: number;
  y: number;
}

class Particle {
  x: number;
  y: number;
  speed: SpeedVector;
  color: string;
  ang: number;
  mag: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    speedVector: SpeedVector,
    c: string
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speedVector;
    this.color = c;
    this.ang = Math.atan2(this.speed.y, this.speed.x);
    this.mag = Math.sqrt(this.speed.x**2 + this.speed.y**2);
  }

  update() {
    const { ctx } = this;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.x += this.speed.x;
    this.y += this.speed.y;
    ctx.lineTo(this.x, this.y);
    ctx.stroke();

    this.ang = Math.atan2(this.speed.y, this.speed.x);
    this.mag = Math.sqrt(this.speed.x**2 + this.speed.y**2);
    
    if (Math.random() < 0.05) {
      const op = [this.ang + Math.PI / 4, this.ang - Math.PI / 4];
      const ch = Math.floor(Math.random() * op.length);
      this.speed.x = Math.cos(op[ch]) * this.mag;
      this.speed.y = Math.sin(op[ch]) * this.mag;
    }
  }

  isOffscreen(canvasWidth: number, canvasHeight: number): boolean {
    return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;
  }
}

const BackgroundCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      console.error("Canvas element or 2D context not found.");
      return;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const speed = 3;
    const period = 1000;

    const Clear = () => {
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const pulse = () => {
      const minHue = 262; 
      const maxHue = 282;
      const h = Math.random() * (maxHue - minHue) + minHue;

      
      const s = 100; // 100% de saturação

      
      const minL = 50; 
      const maxL = 70; 
      const l = Math.random() * (maxL - minL) + minL;
      
      for (let i = 0; i < 56; i++) {
        particles.current.push(new Particle(
          ctx,
          canvas.width / 2,
          canvas.height / 2,
          {
            x: Math.cos(i / 8 * 2 * Math.PI) * speed,
            y: Math.sin(i / 8 * 2 * Math.PI) * speed
          },
          `hsl(${h},${s}%,${l}%)` // Usa as novas variáveis
        ));
      }
    };

    const gameMove = () => {
      Clear();
      const currentParticles = particles.current; 
      for (let i = 0; i < currentParticles.length; i++) {
        const p = currentParticles[i];
        p.update();
        
        if (p.isOffscreen(canvas.width, canvas.height)) {
          currentParticles.splice(i, 1);
          i--;
        }
      }
      animationFrameId.current = requestAnimationFrame(gameMove);
    };

    pulse();
    const pulseInterval = setInterval(pulse, period);
    gameMove();

    return () => {
      clearInterval(pulseInterval);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="background-canvas"
    />
  );
};

export default BackgroundCircuit;