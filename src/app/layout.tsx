import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer/Footer";
import { Header } from "../components/layout/Header/Header";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinicius Rolim Barbosa - Portifólio",
  description: "Portifólio pessoal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Header />
        <div className="pt-16 sm:pt-20 relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
