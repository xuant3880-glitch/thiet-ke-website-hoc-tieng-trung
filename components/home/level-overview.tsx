import Link from 'next/link'
import { LEVELS, wordsByLevel } from '@/lib/vocab'
import { SpeakButton } from '@/components/speak-button'

export function LevelOverview() {
  return (
    <section aria-labelledby="levels-title" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="font-serif text-sm font-semibold tracking-[0.3em] text-primary">等级</p>
        <h2 id="levels-title" className="mt-2 text-3xl font-bold tracking-tight">
          Lộ trình theo chuẩn HSK
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {LEVELS.map((lvl) => {
            const words = wordsByLevel(lvl.level)
            const preview = words.slice(0, 4)
            return (
              <li key={lvl.level} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold">{lvl.title}</h3>
                  <span className="text-sm text-muted-foreground">{`${words.length} từ`}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{lvl.description}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {preview.map((w) => (
                    <li key={w.hanzi} className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2">
                      <span className="font-serif text-xl font-semibold">{w.hanzi}</span>
                      <span className="text-sm text-primary">{w.pinyin}</span>
                      <span className="flex-1 truncate text-right text-sm text-muted-foreground">{w.meaning}</span>
                      <SpeakButton text={w.hanzi} size="sm" />
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/tu-vung?level=${lvl.level}`}
                  className="mt-5 text-sm font-semibold text-primary hover:underline"
                >
                  {`Xem toàn bộ ${lvl.title} →`}
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
