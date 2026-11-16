'use client'
import { useT } from '@/i18n'

export function Footer() {
  const t = useT().footer

  return (
    <footer className="border-t border-purple-subtle/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white-dim">
          © {new Date().getFullYear()} Vinicius Barbosa. {t.built}
        </p>
        <p className="font-mono text-xs text-white-dim">{t.location}</p>
      </div>
    </footer>
  )
}
