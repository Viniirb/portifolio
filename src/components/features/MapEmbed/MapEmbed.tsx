// components/MapEmbed/MapEmbed.tsx
"use client";
import React from "react";

type MapEmbedProps = {
  address: string;
  zoom?: number; // 0-21 (15 é um bom padrão para ruas)
};

export default function MapEmbed({ address, zoom = 15 }: MapEmbedProps) {
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&z=${zoom}&output=embed`;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        title="Localização no mapa"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}