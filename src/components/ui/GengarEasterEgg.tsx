'use client'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { XIcon } from '@phosphor-icons/react'

const PALETTE: Record<string, string> = {
  D: '#2b1a4f',
  P: '#6d4c9f',
  L: '#8a63bf',
  R: '#e63946',
  W: '#ffffff',
  M: '#a3202f',
}

const HEAD = [
  '....D..........D....',
  '....DD........DD....',
  '...DPD........DPD...',
  '...DPPDDDDDDDDPPD...',
  '..DPPPPPPPPPPPPPPD..',
  '.DPPPPPPPPPPPPPPPPD.',
]
const EYES_OPEN = ['DPPPRRRWPPPPWRRRPPPD', 'DPPPPRRRPPPPRRRPPPPD']
const EYES_BLINK = ['DPPPPPPPPPPPPPPPPPPD', 'DPPPPDDDPPPPDDDPPPPD']
const BODY = [
  'DPPPPPPPPPPPPPPPPPPD',
  'DPPWWWWWWWWWWWWWWPPD',
  'DPDMMMMMMMMMMMMMMDPD',
  'DPPDMMMMMMMMMMMMDPPD',
  'DPPPDDDDDDDDDDDDPPPD',
  '.DPPPLLLLLLLLLLPPPD.',
  '.DPPPLLLLLLLLLLPPPD.',
  '..DPPPPPPPPPPPPPPD..',
  '..DPPPPPPPPPPPPPPD..',
  '..DDDD........DDDD..',
]
const COLS = 20

function PixelGengar({ blink, pixel }: { blink: boolean; pixel: number }) {
  const rows = [...HEAD, ...(blink ? EYES_BLINK : EYES_OPEN), ...BODY]
  return (
    <svg
      width={COLS * pixel}
      height={rows.length * pixel}
      viewBox={`0 0 ${COLS} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.75))' }}
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          PALETTE[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[ch]} /> : null
        )
      )}
    </svg>
  )
}

function GlowingEyes() {
  const eye = (x: number) => (
    <g key={x}>
      <rect x={x} y={0} width={4} height={2} fill="#e63946" />
      <rect x={x + 3} y={0} width={1} height={1} fill="#fff" />
      <rect x={x + 1} y={2} width={2} height={1} fill="#e63946" />
    </g>
  )
  return (
    <svg
      width={64}
      height={24}
      viewBox="0 0 11 3"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 8px rgba(230,57,70,0.9))' }}
    >
      {eye(0)}
      {eye(7)}
    </svg>
  )
}

type Phase = 'hidden' | 'eyes' | 'chase' | 'won'
const HITS_TO_WIN = 5
const MAX_MISSES = 3
const COOLDOWN_MS = 5 * 60 * 1000
const TEASES = [
  'Qual é o café favorito do Gengar? O espectro-presso. Kihihi! Contatos liberados.',
  'Por que o Gengar não usa Wi-Fi? Porque ele já atravessa paredes... e firewalls. Kihihi! Tá liberado.',
  'Errou 3 vezes? Boo-a tentativa! Kihihi... liberei os contatos.',
  'O que o fantasma disse para o bug? "Não me assombra!" Kihihi! Pode entrar em contato.',
  'Fantasma não aceita elogio: passa direto. Que nem seus cliques. Kihihi! Liberei.',
]
const WINS = [
  'Kihihi... você me pegou! Contatos destravados. Pode mandar aquele oi, sou só um fantasma, não mordo.',
  'Pegou o Gengar! Reflexo de tipo fantasma, hein? Kihihi! Contatos liberados.',
  'Boo! Até eu me assustei com a sua mira. Quem pega fantasma merece resposta rápida. Contatos liberados!',
  'Ok, ok, você venceu. Eu só queria companhia... o Vinicius está logo ali, é só chamar. Kihihi!',
  'Parabéns! Você ganhou uma assombração de brinde e, claro, os contatos. Kihihi!',
]
const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)]
const rand = (min: number, max: number) => min + Math.random() * (max - min)
type Spot = { left: number; top: number }

// sorteia uma posição que não cubra nenhum ícone (svg/img) da página
function randomSpot(kind: 'eyes' | 'chase', pixel = 6): Spot {
  if (typeof window === 'undefined') return { left: 50, top: 40 }
  const vw = window.innerWidth
  const vh = window.innerHeight
  const narrow = vw < 640
  const box = kind === 'eyes' ? { w: 88, h: 48 } : { w: 20 * pixel + 24, h: 16 * pixel + 90 }
  const icons = [...document.querySelectorAll('svg, img')]
    .filter((el) => !el.closest('[data-egg]'))
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0 && r.width < 400)
  let candidate: Spot = { left: 50, top: 40 }
  for (let i = 0; i < 60; i++) {
    candidate = { left: narrow ? rand(24, 50) : rand(8, 82), top: rand(18, 70) }
    const x = (candidate.left / 100) * vw - 12
    const y = (candidate.top / 100) * vh - (kind === 'chase' ? 70 : 12)
    const hits = icons.some(
      (r) => x < r.right + 12 && x + box.w > r.left - 12 && y < r.bottom + 12 && y + box.h > r.top - 12
    )
    if (!hits) return candidate
  }
  return candidate
}


interface Props {
  section: string
  enabled: boolean
  caught: boolean
  onHaunt: () => void
  onCaught: () => void
  onReset: () => void
}

export function GengarEasterEgg({ section, enabled, caught, onHaunt, onCaught, onReset }: Props) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('hidden')
  const [spot, setSpot] = useState<Spot>({ left: 50, top: 40 })
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [mercy, setMercy] = useState(false)
  const [message, setMessage] = useState(WINS[0])
  const [blink, setBlink] = useState(false)
  const [line, setLine] = useState('')
  const [pixel, setPixel] = useState(6)

  useEffect(() => {
    const update = () => setPixel(window.innerWidth < 640 ? 4 : 6)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const onContact = section === 'contato' && enabled

  // só mora na página de contato: olhos surgem no escuro, mudam de lugar de tempos em tempos
  useEffect(() => {
    if (phase !== 'hidden' || !onContact || caught) return
    const delay = rand(2500, 4500)
    const t = setTimeout(() => {
      setSpot(randomSpot('eyes'))
      setPhase('eyes')
      onHaunt()
    }, delay)
    return () => clearTimeout(t)
  }, [phase, onContact, onHaunt, caught])

  useEffect(() => {
    if (phase !== 'eyes') return
    const t = setTimeout(() => setPhase('hidden'), onContact ? 12000 : 150)
    return () => clearTimeout(t)
  }, [phase, onContact])

  // depois de cada tentativa concluída (acerto ou erro), ele volta em 5 minutos
  useEffect(() => {
    if (!caught) return
    const t = setTimeout(onReset, COOLDOWN_MS)
    return () => clearTimeout(t)
  }, [caught, onReset])

  // piscar
  useEffect(() => {
    if (phase !== 'chase') return
    const id = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 1800)
    return () => clearInterval(id)
  }, [phase])

  // teletransporte, cada vez mais rápido
  useEffect(() => {
    if (phase !== 'chase' || reduceMotion) return
    const t = setTimeout(() => setSpot(randomSpot('chase', pixel)), Math.max(450, 1500 - hits * 260))
    return () => clearTimeout(t)
  }, [phase, hits, spot, reduceMotion, pixel])

  const close = useCallback(() => {
    setPhase('hidden')
    setHits(0)
    setMisses(0)
  }, [])

  useEffect(() => {
    if (phase !== 'chase' && phase !== 'won') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, close])

  function startChase() {
    setHits(0)
    setMisses(0)
    setMercy(false)
    setLine('Kihihi... quer falar com o Vinicius? Me pega!')
    setSpot(randomSpot('chase', pixel))
    setPhase('chase')
  }

  function hit() {
    const next = hits + 1
    if (next >= HITS_TO_WIN) {
      setMercy(false)
      setMessage(pick(WINS))
      setPhase('won')
      onCaught()
      return
    }
    setHits(next)
    setLine(next < HITS_TO_WIN - 1 ? 'Opa! Foi sorte...' : 'Quase! Última...')
    setSpot(randomSpot('chase', pixel))
  }

  function miss() {
    const next = misses + 1
    if (next >= MAX_MISSES) {
      setMercy(true)
      setMessage(pick(TEASES))
      setPhase('won')
      onCaught()
      return
    }
    setMisses(next)
    setLine('Errou! Kihihi...')
  }

  const posStyle = { left: `${spot.left}%`, top: `${spot.top}%` }

  return (
    <>
      <AnimatePresence>
        {phase === 'eyes' && onContact && (
          <motion.button
            key={`eyes-${spot.left}-${spot.top}`}
            type="button"
            data-egg
            onClick={startChase}
            aria-label="Algo se move no escuro. Clique para aceitar o desafio"
            className="fixed z-30 touch-manipulation p-4"
            style={posStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0.2, 0.9] }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 2.4 }}
          >
            <GlowingEyes />
          </motion.button>
        )}
      </AnimatePresence>

      {phase === 'chase' && <div className="fixed inset-0 z-55 touch-manipulation" onClick={miss} aria-hidden="true" />}

      <AnimatePresence>
        {phase === 'chase' && (
          <motion.div
            key={`g-${hits}-${spot.left}`}
            data-egg
            className="fixed z-60"
            style={posStyle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-lg border border-purple-subtle bg-bg-surface/95 px-3 py-2 text-center font-mono text-[11px] text-white">
              {line} <span className="text-purple-glow">acertos {hits}/{HITS_TO_WIN}</span>
              <span className="text-white-dim"> · erros {misses}/{MAX_MISSES}</span>
            </span>
            <motion.button
              type="button"
              onClick={hit}
              aria-label="Pegar o Gengar"
              className="touch-manipulation p-2"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              whileTap={{ scale: 0.9 }}
            >
              <PixelGengar blink={blink} pixel={pixel} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'won' && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Desafio aceito"
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl border border-purple-glow/50 bg-bg-surface p-6 text-center shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(124,58,237,0.35)' }}
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 p-1 text-white-dim hover:text-white"
                aria-label="Fechar"
              >
                <XIcon weight="bold" className="h-5 w-5" />
              </button>
              <div className="flex justify-center">
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <PixelGengar blink={blink} pixel={5} />
                </motion.div>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-gradient">
                {mercy ? 'Liberado! Boo-a tentativa' : 'Desafio aceito!'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white-muted">
                {message}
              </p>
              <button
                type="button"
                onClick={close}
                className="glass-card glow-border mt-5 px-6 py-2 font-mono text-xs uppercase tracking-widest text-white"
              >
                Ver contatos
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'chase' && (
        <button
          type="button"
          onClick={close}
          className="fixed bottom-4 left-1/2 z-60 -translate-x-1/2 touch-manipulation px-4 py-2 font-mono text-xs text-white-dim hover:text-white"
        >
          desistir<span className="hidden sm:inline"> (esc)</span>
        </button>
      )}
    </>
  )
}
