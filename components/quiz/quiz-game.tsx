'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Trophy, Volume2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LevelPicker, type LevelValue } from '@/components/level-picker'
import { shuffle, speakChinese } from '@/lib/speak'
import { loadProgress, recordQuizScore, touchStudy } from '@/lib/progress'
import { wordsByLevel, type Word } from '@/lib/vocab'
import { cn } from '@/lib/utils'

type QuestionType = 'meaning' | 'pinyin' | 'listen'

type Question = {
  type: QuestionType
  word: Word
  options: Word[]
}

const TOTAL = 10

function buildQuestions(level: LevelValue): Question[] {
  const pool = wordsByLevel(level)
  const types: QuestionType[] = ['meaning', 'pinyin', 'listen']

  return shuffle(pool)
    .slice(0, TOTAL)
    .map((word, i) => {
      const distractors = shuffle(
        pool.filter(
          (w) =>
            w.hanzi !== word.hanzi &&
            w.meaning !== word.meaning,
        ),
      ).slice(0, 3)

      return {
        type: types[i % 3],
        word,
        options: shuffle([word, ...distractors]),
      }
    })
}

const PROMPTS: Record<QuestionType, string> = {
  meaning: 'Từ này có nghĩa là gì?',
  pinyin: 'Chọn pinyin đúng cho từ này',
  listen: 'Nghe và chọn chữ Hán đúng',
}

export function QuizGame() {
  const [level, setLevel] = useState<LevelValue>(1)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState<Word[]>([])
  const [best, setBest] = useState(0)

  useEffect(() => {
    setBest(loadProgress().quizBest[String(level)] ?? 0)
  }, [level])

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (
      !questions ||
      index >= questions.length ||
      (e.target as HTMLElement)?.closest('input, textarea')
    ) {
      return
    }

    const n = Number(e.key)

    if (n >= 1 && n <= 4) {
      const option = questions[index]?.options[n - 1]

      if (option) {
        choose(option)
      }
    } else if (e.key === 'Enter' && picked) {
      next()
    }
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e)

    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  function start() {
    const qs = buildQuestions(level)

    setQuestions(qs)
    setIndex(0)
    setPicked(null)
    setScore(0)
    setWrong([])

    touchStudy()

    if (qs[0]?.type === 'listen') {
      speakChinese(qs[0].word.hanzi)
    }
  }

  if (!questions) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <Trophy
            className="mx-auto size-12 text-accent"
            aria-hidden
          />

          <h2 className="mt-4 text-2xl font-bold">
            Sẵn sàng thử thách?
          </h2>

          <p className="mt-2 text-muted-foreground">
            Chọn cấp độ rồi bắt đầu {TOTAL} câu hỏi.
            {best > 0
              ? ` Điểm cao nhất cấp này: ${best}%.`
              : ''}
          </p>

          <div className="mt-6 flex justify-center">
            <LevelPicker
              value={level}
              onChange={setLevel}
            />
          </div>

          <Button
            size="lg"
            className="mt-6"
            onClick={start}
          >
            Bắt đầu <ArrowRight aria-hidden />
          </Button>
        </div>
      </section>
    )
  }

  const finished = index >= questions.length

  if (finished) {
    const percent = Math.round(
      (score / questions.length) * 100,
    )

    return (
      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground">
            Kết quả
          </p>

          <p className="mt-2 text-6xl font-bold text-primary">
            {`${score}/${questions.length}`}
          </p>

          <p className="mt-2 text-lg">
            {percent >= 80
              ? 'Xuất sắc! 太棒了！'
              : percent >= 50
                ? 'Khá tốt, cố lên! 加油！'
                : 'Cần ôn thêm một chút nhé.'}
          </p>

          {best > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              {`Kỷ lục cấp này: ${Math.max(best, percent)}%`}
            </p>
          )}

          {wrong.length > 0 && (
            <div className="mt-6 text-left">
              <p className="font-semibold">
                Từ cần ôn lại
              </p>

              <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
                {wrong.map((w) => (
                  <li
                    key={w.hanzi}
                    className="flex items-center justify-between gap-3 px-4 py-2.5"
                  >
                    <span
                      lang="zh-CN"
                      className="font-serif text-xl"
                    >
                      {w.hanzi}
                    </span>

                    <span className="text-sm text-primary">
                      {w.pinyin}
                    </span>

                    <span className="flex-1 text-right text-sm text-muted-foreground">
                      {w.meaning}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={start}>
              <RotateCcw aria-hidden />
              Làm lại
            </Button>

            <Button
              variant="outline"
              onClick={() => setQuestions(null)}
            >
              Đổi cấp độ
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const q = questions[index]
  const answered = picked !== null

  function choose(option: Word) {
    if (answered) return

    setPicked(option.hanzi)

    const correct = option.hanzi === q.word.hanzi
    const nextScore = score + (correct ? 1 : 0)

    if (correct) {
      setScore((s) => s + 1)
    } else {
      setWrong((w) => [...w, q.word])
    }

    if (questions && index + 1 === questions.length) {
      const saved = recordQuizScore(
        String(level),
        nextScore,
        questions.length,
      )

      setBest(
        saved.quizBest[String(level)] ?? 0,
      )
    }
  }

  function next() {
    const nextIndex = index + 1

    setIndex(nextIndex)
    setPicked(null)

    const nq = questions?.[nextIndex]

    if (nq?.type === 'listen') {
      speakChinese(nq.word.hanzi)
    }
  }

  function optionLabel(o: Word) {
    if (q.type === 'meaning') return o.meaning
    if (q.type === 'pinyin') return o.pinyin

    return o.hanzi
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {`Câu ${index + 1}/${questions.length}`}
        </span>

        <span>
          {`Điểm: ${score}`}
        </span>
      </div>

      <Progress
        value={(index / questions.length) * 100}
        className="mt-2"
        aria-label="Tiến độ"
      />

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-center font-semibold text-muted-foreground">
          {PROMPTS[q.type]}
        </p>

        <div className="mt-6 flex justify-center">
          {q.type === 'listen' ? (
            <button
              type="button"
              onClick={() => speakChinese(q.word.hanzi)}
              className="flex size-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              <Volume2
                className="size-12"
                aria-hidden
              />

              <span className="sr-only">
                Nghe lại
              </span>
            </button>
          ) : (
            <p
              lang="zh-CN"
              className="font-serif text-7xl font-bold"
            >
              {q.word.hanzi}
            </p>
          )}
        </div>

        {answered && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <span
              lang="zh-CN"
              className="font-serif text-base text-foreground"
            >
              {q.word.hanzi}
            </span>

            {` · ${q.word.pinyin} · ${q.word.meaning}`}
          </p>
        )}

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {q.options.map((o, i) => {
            const isCorrect =
              o.hanzi === q.word.hanzi

            const isPicked =
              picked === o.hanzi

            return (
              <li key={o.hanzi}>
                <button
                  type="button"
                  onClick={() => choose(o)}
                  disabled={answered}
                  lang={
                    q.type === 'listen'
                      ? 'zh-CN'
                      : undefined
                  }
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-xl border-2 px-4 py-3.5 text-left font-medium transition-colors',
                    q.type === 'listen' &&
                      'font-serif text-2xl',
                    !answered &&
                      'border-border hover:border-primary hover:bg-primary/5',
                    answered &&
                      isCorrect &&
                      'border-success bg-success/10',
                    answered &&
                      isPicked &&
                      !isCorrect &&
                      'border-destructive bg-destructive/10',
                    answered &&
                      !isCorrect &&
                      !isPicked &&
                      'border-border opacity-60',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">
                      {i + 1}
                    </span>

                    {optionLabel(o)}
                  </span>

                  {answered && isCorrect && (
                    <Check
                      className="size-5 text-success"
                      aria-label="Đúng"
                    />
                  )}

                  {answered &&
                    isPicked &&
                    !isCorrect && (
                      <X
                        className="size-5 text-destructive"
                        aria-label="Sai"
                      />
                    )}
                </button>
              </li>
            )
          })}
        </ul>

        {answered && (
          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Nhấn Enter để tiếp tục
            </p>

            <Button onClick={next}>
              {index + 1 === questions.length
                ? 'Xem kết quả'
                : 'Câu tiếp'}

              <ArrowRight aria-hidden />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
