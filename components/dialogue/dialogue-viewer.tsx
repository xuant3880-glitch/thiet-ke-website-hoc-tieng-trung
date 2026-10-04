'use client'

import { useState } from 'react'
import { Play, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { SpeakButton } from '@/components/speak-button'
import { speakSequence, stopSpeaking } from '@/lib/speak'
import { DIALOGUES } from '@/lib/dialogues'
import { cn } from '@/lib/utils'

export function DialogueViewer() {
  const [activeId, setActiveId] = useState(DIALOGUES[0].id)
  const [showPinyin, setShowPinyin] = useState(true)
  const [showVi, setShowVi] = useState(true)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const dialogue = DIALOGUES.find((d) => d.id === activeId) ?? DIALOGUES[0]

  function stop() {
    stopSpeaking()
    setPlayingIndex(null)
  }

  function playAll() {
    speakSequence(
      dialogue.lines.map((line) => line.hanzi),
      {
        onStart: (i) => setPlayingIndex(i),
        onComplete: () => setPlayingIndex(null),
      },
    )
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[280px_1fr]">
      <nav aria-label="Danh sách hội thoại">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {DIALOGUES.map((d) => (
            <li key={d.id} className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  stop()
                  setActiveId(d.id)
                }}
                aria-current={d.id === activeId ? 'true' : undefined}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                  d.id === activeId ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50',
                )}
              >
                <span className="block text-xs font-semibold text-primary">{d.level}</span>
                <span className="block font-semibold">{d.title}</span>
                <span lang="zh-CN" className="block font-serif text-sm text-muted-foreground">
                  {d.titleZh}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <article className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
        <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 lang="zh-CN" className="font-serif text-3xl font-bold">
              {dialogue.titleZh}
            </h2>
            <p className="mt-1 text-muted-foreground">{dialogue.scene}</p>
          </div>
          {playingIndex !== null ? (
            <Button variant="outline" onClick={stop}>
              <Square aria-hidden /> Dừng
            </Button>
          ) : (
            <Button onClick={playAll}>
              <Play aria-hidden /> Nghe cả đoạn
            </Button>
          )}
        </header>

        <div className="mt-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch id="toggle-pinyin" checked={showPinyin} onCheckedChange={setShowPinyin} />
            <Label htmlFor="toggle-pinyin">Pinyin</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="toggle-vi" checked={showVi} onCheckedChange={setShowVi} />
            <Label htmlFor="toggle-vi">Bản dịch</Label>
          </div>
        </div>

        <ol className="mt-6 flex flex-col gap-4">
          {dialogue.lines.map((line, i) => {
            const isA = line.speaker === 'A'
            return (
              <li key={i} className={cn('flex gap-3', !isA && 'flex-row-reverse')}>
                <span
                  aria-hidden
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                    isA ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground',
                  )}
                >
                  {line.speaker}
                </span>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 transition-shadow',
                    isA ? 'rounded-tl-sm bg-secondary' : 'rounded-tr-sm bg-primary/8',
                    playingIndex === i && 'ring-2 ring-primary',
                  )}
                >
                  <div className="flex items-start gap-2">
                    <p lang="zh-CN" className="font-serif text-xl leading-relaxed">
                      {line.hanzi}
                    </p>
                    <SpeakButton text={line.hanzi} size="sm" className="mt-0.5" />
                  </div>
                  {showPinyin && <p className="mt-1 text-sm text-primary">{line.pinyin}</p>}
                  {showVi && <p className="mt-1 text-sm text-muted-foreground">{line.vi}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </article>
    </section>
  )
}
