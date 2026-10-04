'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import { Eye, PenLine, Play, RotateCcw, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SpeakButton } from '@/components/speak-button'
import { WORDS } from '@/lib/vocab'
import { touchStudy } from '@/lib/progress'
import { cn } from '@/lib/utils'

const CHARACTERS = Array.from(
  new Map(WORDS.filter((w) => w.hanzi.length === 1).map((w) => [w.hanzi, w])).values(),
)

type Mode = 'idle' | 'animating' | 'quiz' | 'done'

function writerColors() {
  const dark = document.documentElement.classList.contains('dark')
  return {
    strokeColor: dark ? '#f4ebe0' : '#2b2420',
    radicalColor: dark ? '#f07167' : '#c0392b',
    outlineColor: dark ? '#3a322c' : '#e6dccb',
    drawingColor: dark ? '#f07167' : '#c0392b',
    highlightColor: dark ? '#e0b34a' : '#d4a72c',
  }
}

export function WritingPractice() {
  const [selected, setSelected] = useState(CHARACTERS[0])
  const [mode, setMode] = useState<Mode>('idle')
  const [mistakes, setMistakes] = useState(0)
  const [loadError, setLoadError] = useState(false)
  const [query, setQuery] = useState('')
  const targetRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriter | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CHARACTERS
    return CHARACTERS.filter(
      (c) => c.hanzi.includes(query.trim()) || c.pinyin.toLowerCase().includes(q) || c.meaning.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    el.innerHTML = ''
    setMode('idle')
    setMistakes(0)
    setLoadError(false)
    const size = Math.min(el.clientWidth || 320, 320)
    writerRef.current = HanziWriter.create(el, selected.hanzi, {
      width: size,
      height: size,
      padding: 12,
      ...writerColors(),
      strokeAnimationSpeed: 1.2,
      delayBetweenStrokes: 200,
      showOutline: true,
      onLoadCharDataError: () => setLoadError(true),
    })
    return () => {
      writerRef.current?.cancelQuiz()
      writerRef.current = null
    }
  }, [selected])

  useEffect(() => {
    const recreate = () => setSelected((s) => ({ ...s }))
    window.addEventListener('hnd-theme', recreate)
    return () => window.removeEventListener('hnd-theme', recreate)
  }, [])

  function animate() {
    const writer = writerRef.current
    if (!writer) return
    writer.cancelQuiz()
    writer.showCharacter()
    setMode('animating')
    writer.animateCharacter({ onComplete: () => setMode('idle') })
  }

  function startQuiz() {
    const writer = writerRef.current
    if (!writer) return
    setMistakes(0)
    setMode('quiz')
    touchStudy()
    writer.quiz({
      showHintAfterMisses: 2,
      onMistake: () => setMistakes((m) => m + 1),
      onComplete: (summary) => {
        setMistakes(summary.totalMistakes)
        setMode('done')
      },
    })
  }

  function reveal() {
    const writer = writerRef.current
    if (!writer) return
    writer.cancelQuiz()
    writer.showCharacter()
    setMode('idle')
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{selected.pinyin}</p>
            <p className="text-sm text-muted-foreground">{selected.meaning}</p>
          </div>
          <SpeakButton text={selected.hanzi} />
        </div>

        <div className="relative mt-5 aspect-square w-full max-w-80">
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
            <rect x="1" y="1" width="98" height="98" fill="none" className="stroke-primary/40" strokeWidth="1" />
            <line x1="0" y1="0" x2="100" y2="100" className="stroke-primary/20" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="100" className="stroke-primary/20" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" className="stroke-primary/20" strokeDasharray="2 2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" className="stroke-primary/20" strokeDasharray="2 2" strokeWidth="0.5" />
          </svg>
          <div ref={targetRef} className="relative size-full touch-none" aria-label={`Ô luyện viết chữ ${selected.hanzi}`} role="img" />
        </div>

        <p className="mt-4 min-h-6 text-center text-sm" aria-live="polite">
          {loadError && <span className="text-destructive">Không tải được dữ liệu nét chữ. Vui lòng kiểm tra kết nối mạng.</span>}
          {!loadError && mode === 'quiz' && (
            <span className="text-muted-foreground">{`Hãy viết theo đúng thứ tự nét · Sai: ${mistakes}`}</span>
          )}
          {!loadError && mode === 'done' && (
            <span className="font-semibold text-success">
              {mistakes === 0 ? 'Tuyệt vời! Bạn viết đúng hoàn toàn.' : `Hoàn thành! Bạn sai ${mistakes} nét.`}
            </span>
          )}
          {!loadError && mode === 'animating' && <span className="text-muted-foreground">Đang minh họa thứ tự nét…</span>}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button variant="outline" onClick={animate} disabled={mode === 'animating' || loadError}>
            <Play aria-hidden /> Xem nét
          </Button>
          <Button onClick={startQuiz} disabled={loadError}>
            {mode === 'done' ? <RotateCcw aria-hidden /> : <PenLine aria-hidden />}
            {mode === 'done' ? 'Viết lại' : 'Tự viết'}
          </Button>
          {mode === 'quiz' && (
            <Button variant="ghost" onClick={reveal}>
              <Eye aria-hidden /> Hiện chữ
            </Button>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Chọn chữ để luyện</h2>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Tìm chữ</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm chữ, pinyin, nghĩa…"
              className="h-10 w-full rounded-full border border-input bg-card pl-9 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </label>
        </div>
        <ul className="mt-4 grid max-h-[28rem] grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-8">
          {filtered.map((c) => (
            <li key={c.hanzi}>
              <button
                type="button"
                onClick={() => setSelected(c)}
                aria-pressed={c.hanzi === selected.hanzi}
                aria-label={`${c.hanzi} ${c.pinyin} — ${c.meaning}`}
                className={cn(
                  'flex aspect-square w-full items-center justify-center rounded-xl border font-serif text-2xl transition-colors',
                  c.hanzi === selected.hanzi
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary/60',
                )}
                lang="zh-CN"
              >
                {c.hanzi}
              </button>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && <p className="mt-4 text-sm text-muted-foreground">Không có chữ phù hợp.</p>}
        <div className="mt-6 rounded-2xl bg-secondary/60 p-5 text-sm leading-relaxed">
          <p className="font-semibold">Quy tắc viết cơ bản</p>
          <ul className="mt-2 list-inside list-disc text-muted-foreground">
            <li>Ngang trước, sổ sau — 十</li>
            <li>Phẩy trước, mác sau — 人</li>
            <li>Trên trước, dưới sau — 三</li>
            <li>Trái trước, phải sau — 你</li>
            <li>Ngoài trước, trong sau, đóng khung cuối — 国</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
