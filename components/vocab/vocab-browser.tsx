'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Star } from 'lucide-react'
import { CATEGORIES, wordsByLevel } from '@/lib/vocab'
import { LevelPicker, type LevelValue } from '@/components/level-picker'
import { SpeakButton } from '@/components/speak-button'
import { loadProgress, toggleStarred } from '@/lib/progress'
import { LockOverlay } from '@/components/lock-overlay'
import { canAccessLevel } from '@/lib/subscription'
import { cn } from '@/lib/utils'

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
}

export function VocabBrowser({ initialLevel }: { initialLevel: LevelValue }) {
  const router = useRouter()
  const pathname = usePathname()
  const [level, setLevel] = useState<LevelValue>(initialLevel)
  const [category, setCategory] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [starredOnly, setStarredOnly] = useState(false)
  const [starred, setStarred] = useState<string[]>([])
  const [known, setKnown] = useState<string[]>([])

  useEffect(() => {
    const progress = loadProgress()
    setStarred(progress.starred)
    setKnown(progress.known)
    const sync = () => {
      const next = loadProgress()
      setStarred(next.starred)
      setKnown(next.known)
    }
    window.addEventListener('hnd-progress', sync)
    return () => window.removeEventListener('hnd-progress', sync)
  }, [])

  function changeLevel(next: LevelValue) {
    setLevel(next)
    const params = new URLSearchParams()
    if (next !== 'all') params.set('level', String(next))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const results = useMemo(() => {
    const q = normalize(query.trim())
    const starredSet = new Set(starred)
    const knownSet = new Set(known)
    return wordsByLevel(level)
      .filter((w) => {
        if (starredOnly && !starredSet.has(w.hanzi)) return false
        if (category !== 'all' && w.category !== category) return false
        if (!q) return true
        return w.hanzi.includes(query.trim()) || normalize(w.pinyin).includes(q) || normalize(w.meaning).includes(q)
      })
      .sort((a, b) => Number(knownSet.has(a.hanzi)) - Number(knownSet.has(b.hanzi)))
  }, [level, category, query, starredOnly, starred, known])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <LevelPicker value={level} onChange={changeLevel} />
        <div className="flex w-full items-center gap-2 md:max-w-md">
          <button
            type="button"
            aria-pressed={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            className={cn(
              'inline-flex h-11 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold',
              starredOnly ? 'border-gold bg-accent/20 text-foreground' : 'border-border bg-card text-muted-foreground',
            )}
          >
            <Star className={cn('size-3.5', starredOnly && 'fill-gold text-gold')} aria-hidden />
            Đánh dấu
          </button>
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Tìm từ vựng</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm: 你好, ni hao, xin chào…"
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Lọc theo chủ đề">
        {['all', ...CATEGORIES].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              category === c
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            {c === 'all' ? 'Mọi chủ đề' : c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {`Tìm thấy ${results.length} từ`}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Không tìm thấy từ phù hợp. Hãy thử từ khóa khác nhé!
        </div>
      ) : (
        <LockOverlay level={typeof level === 'number' ? level : results[0]?.level || 3}>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((w) => {
              const isStarred = starred.includes(w.hanzi)
              const isKnown = known.includes(w.hanzi)
              return (
                <li
                  key={`${w.level}-${w.hanzi}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {`HSK ${w.level} · ${w.category}`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setStarred(toggleStarred(w.hanzi).starred)}
                        aria-pressed={isStarred}
                        aria-label={isStarred ? 'Bỏ đánh dấu' : 'Đánh dấu từ'}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Star className={cn('size-4', isStarred && 'fill-gold text-gold')} />
                      </button>
                      <SpeakButton text={w.hanzi} size="sm" />
                    </div>
                  </div>
                  <p lang="zh-CN" className="mt-3 font-serif text-4xl font-bold">
                    {w.hanzi}
                  </p>
                  <p className="mt-1 font-medium text-primary">{w.pinyin}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.meaning}</p>
                  {isKnown && <p className="mt-3 text-[11px] font-semibold text-success">Đã thuộc</p>}
                </li>
              )
            })}
          </ul>
        </LockOverlay>
      )}
    </div>
  )
}
