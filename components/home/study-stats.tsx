'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Flame, Star } from 'lucide-react'
import { loadProgress, type StudyProgress } from '@/lib/progress'
import { WORDS } from '@/lib/vocab'

export function StudyStats() {
  const [progress, setProgress] = useState<StudyProgress | null>(null)

  useEffect(() => {
    const sync = () => setProgress(loadProgress())
    sync()
    window.addEventListener('hnd-progress', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('hnd-progress', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!progress) return null

  const known = progress.known.filter((h) => WORDS.some((w) => w.hanzi === h)).length
  const starred = progress.starred.length
  const best = Math.max(0, ...Object.values(progress.quizBest))

  return (
    <section aria-label="Tiến độ học tập" className="mx-auto max-w-6xl px-4 pb-4">
      <ul className="grid gap-3 sm:grid-cols-4">
        <li className="rounded-2xl border border-border bg-card px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Flame className="size-3.5 text-primary" aria-hidden />
            Chuỗi ngày
          </p>
          <p className="mt-1 text-2xl font-bold">{progress.streak}</p>
        </li>
        <li className="rounded-2xl border border-border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground">Từ đã thuộc</p>
          <p className="mt-1 text-2xl font-bold">
            {known}
            <span className="text-sm font-medium text-muted-foreground">{` / ${WORDS.length}`}</span>
          </p>
        </li>
        <li className="rounded-2xl border border-border bg-card px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Star className="size-3.5 text-gold" aria-hidden />
            Từ đánh dấu
          </p>
          <p className="mt-1 text-2xl font-bold">{starred}</p>
        </li>
        <li className="rounded-2xl border border-border bg-card px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground">Điểm quiz cao nhất</p>
          <p className="mt-1 text-2xl font-bold">{best}%</p>
          <Link href="/trac-nghiem" className="text-xs font-semibold text-primary hover:underline">
            Làm thêm bài →
          </Link>
        </li>
      </ul>
    </section>
  )
}
