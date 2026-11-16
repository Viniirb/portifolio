'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { strings, type Strings } from './strings'
import type { Lang, Localized } from './types'

export type { Lang, Localized }

const STORAGE_KEY = 'vrb-lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({ lang: 'pt', setLang: () => {} })

function readInitialLang(): Lang {
  // ?lang=en wins (shareable link), then the saved choice, then the browser language.
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang')
    if (fromQuery === 'pt' || fromQuery === 'en') return fromQuery
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // Storage can be blocked; fall through to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The first render is always Portuguese so the server and client markup match; the real choice
  // is applied right after hydration.
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value, read after hydration
    setLangState(readInitialLang())
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = strings[lang].meta.title
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not being able to remember the choice is fine.
    }
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}

export function useT(): Strings {
  return strings[useLang().lang]
}

// Picks the current language out of a { pt, en } value from the data files.
export function useL() {
  const { lang } = useLang()
  return useCallback(<T,>(value: Localized<T>): T => value[lang], [lang])
}
