import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/Footer/Footer'
import { PageCurtain } from '@/components/layout/PageCurtain'
import { CustomCursorLoader } from '@/components/ui/CustomCursorLoader'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Providers } from '@/components/layout/Providers'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: '/' },
  icons: { icon: '/tech/terminal.svg' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080810',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Engenheiro de Software Sênior',
  worksFor: { '@type': 'Organization', name: 'iBR Software' },
  address: { '@type': 'PostalAddress', addressLocality: 'Joinville', addressRegion: 'SC', addressCountry: 'BR' },
  email: 'contato@viniciusrb.dev',
  sameAs: ['https://github.com/Viniirb', 'https://linkedin.com/in/viniciusrolimbarbosa'],
  knowsAbout: ['.NET', 'C#', 'Arquitetura distribuída', 'Machine Learning', 'React', 'Next.js'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <ErrorBoundary>
            <PageCurtain />
            <CustomCursorLoader />
            <div className="relative z-10">{children}</div>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
