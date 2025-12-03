import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <div className="pt-16 sm:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
