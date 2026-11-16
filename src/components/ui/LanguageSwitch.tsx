'use client'
import { useLang, useT, type Lang } from '@/i18n'

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: 'pt', label: 'PT' },
  { lang: 'en', label: 'EN' },
]

export function LanguageSwitch() {
  const { lang, setLang } = useLang()
  const t = useT()

  return (
    <div
      role="group"
      aria-label={t.header.language}
      className="inline-flex rounded-full border border-purple-subtle/60 p-0.5 font-mono text-xs"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.lang}
          type="button"
          onClick={() => setLang(option.lang)}
          aria-pressed={lang === option.lang}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === option.lang ? 'bg-purple-glow text-white' : 'text-white-muted hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
