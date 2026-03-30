import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/Footer/Footer'
import { PageCurtain } from '@/components/layout/PageCurtain'
import { CustomCursorLoader } from '@/components/ui/CustomCursorLoader'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const TITLE = 'Vinicius Rolim Barbosa — Engenharia de Software, Inovação e Modernização'
const DESCRIPTION =
  'Portfólio de Vinicius Barbosa: soluções modernas, inovação em engenharia de software, automação, IA e transformação digital com foco em .NET, React, arquitetura escalável e experiência real em projetos críticos.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}


export function Head() {
  return (
    <>
      <link rel="icon" href="/tech/terminal.svg" type="image/svg+xml" />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <Head />
      </head>
      <body className={inter.variable}>
        <ErrorBoundary>
          <PageCurtain />
          <CustomCursorLoader />
          <div className="relative z-10">{children}</div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
