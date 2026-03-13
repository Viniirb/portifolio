import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header/Header'
import { Footer } from '@/components/layout/Footer/Footer'
import { PageCurtain } from '@/components/layout/PageCurtain'
import { CustomCursorLoader } from '@/components/ui/CustomCursorLoader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinicius Rolim Barbosa — Full Stack Developer',
  description:
    'Portfólio pessoal de Vinicius Barbosa — Full Stack Developer especializado em .NET, React e Next.js.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.variable}>
        <PageCurtain />
        <CustomCursorLoader />
        <Header />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
