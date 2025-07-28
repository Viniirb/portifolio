import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinicius Rolim Barbosa - Portifólio",
  description: "Portifólio pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body >
        {children}
      </body>
    </html>
  );
}
