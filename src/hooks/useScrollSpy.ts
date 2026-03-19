import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const scrollRoot = document.body
    const observers = new Map<string, IntersectionObserver>()

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { root: scrollRoot, threshold: 0.3 }
      )

      observer.observe(el)
      observers.set(id, observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sectionIds])

  return active
}
