"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Cloud, CloudRain, Sun, CloudDrizzle } from "lucide-react";
import { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState("");
  const [weather] = useState({ temp: "24", condition: "clear" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "rain":
        return <CloudRain className="w-4 h-4" />;
      case "drizzle":
        return <CloudDrizzle className="w-4 h-4" />;
      case "cloudy":
        return <Cloud className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/30 backdrop-blur-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Localização, Clima e Hora */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Joinville, BR</span>
              <span className="sm:hidden">JVE, BR</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              {getWeatherIcon()}
              <span>{weather.temp}°C</span>
            </div>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default React.memo(Header);
