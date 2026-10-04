'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Shuffle,
  Trash2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LevelPicker, type LevelValue } from '@/components/level-picker'
import { SpeakButton } from '@/components/speak-button'
import { shuffle } from '@/lib/speak'
import { loadProgress, setWordStatus, touchStudy } from '@/lib/progress'
import { wordsByLevel, type Word } from '@/lib/vocab'
import { cn } from '@/lib/utils'

const CUSTOM_CARDS_KEY = 'tieng-trung-custom-flashcards'

function setsForDeck(deck: Word[]) {
  const progress = loadProgress()
  const keys = new Set(deck.map((w) => w.hanzi))

  return {
    known: new Set(progress.known.filter((h) => keys.has(h))),
    unknown: new Set(progress.unknown.filter((h) => keys.has(h))),
  }
}

function loadCustomCards(): Word[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = localStorage.getItem(CUSTOM_CARDS_KEY)

    if (!saved) return []

    const parsed = JSON.parse(saved)

    if (!Array.isArray(parsed)) return []

    return parsed
  } catch {
    return []
  }
}

function saveCustomCards(cards: Word[]) {
  localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(cards))
}

export function FlashcardDeck() {
  const [level, setLevel] = useState<LevelValue>(1)
  const [customCards, setCustomCards] = useState<Word[]>([])
  const [deck, setDeck] = useState<Word[]>(() => wordsByLevel(1))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [unknown, setUnknown] = useState<Set<string>>(new Set())

  const [showAddForm, setShowAddForm] = useState(false)
  const [hanzi, setHanzi] = useState('')
  const [pinyin, setPinyin] = useState('')
  const [meaning, setMeaning] = useState('')
  const [category, setCategory] = useState('Tự thêm')

  const finished = index >= deck.length
  const card = deck[index]

  useEffect(() => {
    const savedCards = loadCustomCards()

    setCustomCards(savedCards)

    const initialDeck = [
      ...wordsByLevel(1),
      ...savedCards.filter((card) => card.level === 1),
    ]

    setDeck(initialDeck)

    const saved = setsForDeck(initialDeck)
    setKnown(saved.known)
    setUnknown(saved.unknown)
  }, [])

  function getDeckForLevel(nextLevel: LevelValue) {
    if (nextLevel === 'all') {
      return [
        ...wordsByLevel(1),
        ...wordsByLevel(2),
        ...wordsByLevel(3),
        ...wordsByLevel(4),
        ...wordsByLevel(5),
        ...wordsByLevel(6),
        ...customCards,
      ]
    }

    return [
      ...wordsByLevel(nextLevel),
      ...customCards.filter(
        (card) => card.level === nextLevel,
      ),
    ]
  }

  function reset(nextDeck: Word[], keepStatus = true) {
    setDeck(nextDeck)
    setIndex(0)
    setFlipped(false)

    if (keepStatus) {
      const saved = setsForDeck(nextDeck)
      setKnown(saved.known)
      setUnknown(saved.unknown)
    } else {
      setKnown(new Set())
      setUnknown(new Set())
    }
  }

  function go(delta: number) {
    setFlipped(false)

    setIndex((i) =>
      Math.min(
        Math.max(i + delta, 0),
        deck.length,
      ),
    )
  }

  function mark(isKnown: boolean) {
    if (!card) return

    const key = card.hanzi

    setWordStatus(
      key,
      isKnown ? 'known' : 'unknown',
    )

    touchStudy()

    setKnown((s) => {
      const n = new Set(s)

      if (isKnown) {
        n.add(key)
      } else {
        n.delete(key)
      }

      return n
    })

    setUnknown((s) => {
      const n = new Set(s)

      if (isKnown) {
        n.delete(key)
      } else {
        n.add(key)
      }

      return n
    })

    go(1)
  }

  function addCard() {
    const cleanHanzi = hanzi.trim()
    const cleanPinyin = pinyin.trim()
    const cleanMeaning = meaning.trim()
    const cleanCategory =
      category.trim() || 'Tự thêm'

    if (
      !cleanHanzi ||
      !cleanPinyin ||
      !cleanMeaning
    ) {
      alert(
        'Vui lòng nhập Hán tự, Pinyin và nghĩa tiếng Việt.',
      )
      return
    }

    const exists = [
      ...customCards,
      ...getDeckForLevel(level),
    ].some(
      (card) => card.hanzi === cleanHanzi,
    )

    if (exists) {
      alert('Thẻ này đã tồn tại.')
      return
    }

    const cardLevel =
      level === 'all' ? 1 : level

    const newCard: Word = {
      hanzi: cleanHanzi,
      pinyin: cleanPinyin,
      meaning: cleanMeaning,
      category: cleanCategory,
      level: cardLevel,
    }

    const updatedCustomCards = [
      ...customCards,
      newCard,
    ]

    setCustomCards(updatedCustomCards)
    saveCustomCards(updatedCustomCards)

    const nextDeck =
      getDeckForLevel(level).concat(newCard)

    reset(nextDeck)

    setHanzi('')
    setPinyin('')
    setMeaning('')
    setCategory('Tự thêm')
    setShowAddForm(false)
  }

  function deleteCustomCard(
    cardToDelete: Word,
  ) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa thẻ "${cardToDelete.hanzi}" không?`,
    )

    if (!confirmed) return

    const updatedCustomCards =
      customCards.filter(
        (card) =>
          card.hanzi !==
          cardToDelete.hanzi,
      )

    setCustomCards(updatedCustomCards)
    saveCustomCards(updatedCustomCards)

    const nextDeck =
      getDeckForLevel(level).filter(
        (card) =>
          card.hanzi !==
          cardToDelete.hanzi,
      )

    reset(nextDeck)
  }

  const onKey = useEffectEvent(
    (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.closest(
          'input, textarea',
        )
      ) {
        return
      }

      if (finished) return

      if (e.code === 'Space') {
        if (
          (e.target as HTMLElement)?.closest(
            'button',
          )
        ) {
          return
        }

        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === 'ArrowRight') {
        go(1)
      } else if (e.key === 'ArrowLeft') {
        go(-1)
      } else if (e.key === '1') {
        mark(false)
      } else if (e.key === '2') {
        mark(true)
      }
    },
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      onKey(e)

    window.addEventListener(
      'keydown',
      handler,
    )

    return () =>
      window.removeEventListener(
        'keydown',
        handler,
      )
  }, [])

  const progress = deck.length
    ? Math.round(
        (Math.min(
          index,
          deck.length,
        ) /
          deck.length) *
          100,
      )
    : 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LevelPicker
          value={level}
          onChange={(v) => {
            setLevel(v)
            reset(getDeckForLevel(v))
          }}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="h-9"
            onClick={() =>
              reset(shuffle(deck))
            }
          >
            <Shuffle aria-hidden />
            Trộn thẻ
          </Button>

          <Button
            className="h-9"
            onClick={() =>
              setShowAddForm(
                (value) => !value,
              )
            }
          >
            <Plus aria-hidden />
            Thêm thẻ
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="mt-6 rounded-3xl border border-primary/20 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Thêm flashcard mới
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Tự tạo thẻ từ vựng của riêng bạn.
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setShowAddForm(false)
              }
              aria-label="Đóng"
            >
              <X />
            </Button>
          </div>

          <div className="mt-5 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Hán tự
              </label>

              <input
                value={hanzi}
                onChange={(e) =>
                  setHanzi(e.target.value)
                }
                placeholder="Ví dụ: 学习"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-lg outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Pinyin
              </label>

              <input
                value={pinyin}
                onChange={(e) =>
                  setPinyin(e.target.value)
                }
                placeholder="Ví dụ: xuéxí"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Nghĩa tiếng Việt
              </label>

              <input
                value={meaning}
                onChange={(e) =>
                  setMeaning(e.target.value)
                }
                placeholder="Ví dụ: học tập"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phân loại
              </label>

              <input
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                placeholder="Ví dụ: Động từ"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                Hủy
              </Button>

              <Button onClick={addCard}>
                <Plus aria-hidden />
                Lưu thẻ
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {`Thẻ ${Math.min(index + 1, deck.length)} / ${deck.length}`}
          </span>

          <span className="flex gap-4">
            <span className="text-success">
              {`Đã thuộc: ${known.size}`}
            </span>

            <span className="text-destructive">
              {`Chưa thuộc: ${unknown.size}`}
            </span>
          </span>
        </div>

        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tiến độ"
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {finished ? (
        <div className="mt-8 rounded-3xl border border-border bg-card p-10 text-center">
          <p
            lang="zh-CN"
            className="font-serif text-6xl font-bold text-primary"
          >
            棒!
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            Hoàn thành bộ thẻ
          </h2>

          <p className="mt-2 text-muted-foreground">
            {`Bạn đã thuộc ${known.size}/${deck.length} từ. ${
              unknown.size > 0
                ? 'Hãy ôn lại những từ chưa thuộc nhé!'
                : 'Xuất sắc!'
            }`}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {unknown.size > 0 && (
              <Button
                className="h-10 px-4"
                onClick={() =>
                  reset(
                    shuffle(
                      deck.filter(
                        (w) =>
                          unknown.has(
                            w.hanzi,
                          ),
                      ),
                    ),
                    false,
                  )
                }
              >
                {`Ôn lại ${unknown.size} từ chưa thuộc`}
              </Button>
            )}

            <Button
              variant="outline"
              className="h-10 px-4"
              onClick={() =>
                reset(
                  shuffle(
                    getDeckForLevel(
                      level,
                    ),
                  ),
                )
              }
            >
              <RotateCcw aria-hidden />
              Học lại từ đầu
            </Button>
          </div>
        </div>
      ) : (
        card && (
          <>
            <div className="perspective-1000 mt-8">
              <button
                type="button"
                onClick={() =>
                  setFlipped((f) => !f)
                }
                aria-label={
                  flipped
                    ? 'Lật về mặt trước'
                    : 'Lật thẻ xem nghĩa'
                }
                className={cn(
                  'preserve-3d relative block h-80 w-full transition-transform duration-500 motion-reduce:transition-none md:h-96',
                  flipped &&
                    'rotate-y-180',
                )}
              >
                <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border bg-card shadow-lg">
                  <span className="absolute left-5 top-5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    {`HSK ${card.level}`}
                  </span>

                  <span
                    lang="zh-CN"
                    className="font-serif text-8xl font-bold md:text-9xl"
                  >
                    {card.hanzi}
                  </span>

                  <span className="mt-6 text-sm text-muted-foreground">
                    Bấm để lật thẻ · Space
                  </span>
                </div>

                <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary/40 bg-primary text-primary-foreground shadow-lg">
                  <span
                    lang="zh-CN"
                    className="font-serif text-5xl font-bold"
                  >
                    {card.hanzi}
                  </span>

                  <span className="mt-3 text-3xl font-semibold">
                    {card.pinyin}
                  </span>

                  <span className="mt-3 text-xl opacity-90">
                    {card.meaning}
                  </span>

                  <span className="mt-4 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs">
                    {card.category}
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label="Thẻ trước"
              >
                <ChevronLeft />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-11 border-destructive/40 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() =>
                    mark(false)
                  }
                >
                  <X aria-hidden />
                  Chưa thuộc
                </Button>

                <SpeakButton
                  text={card.hanzi}
                  size="lg"
                />

                <Button
                  className="h-11 bg-success px-4 text-primary-foreground hover:bg-success/90"
                  onClick={() =>
                    mark(true)
                  }
                >
                  <Check aria-hidden />
                  Đã thuộc
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => go(1)}
                aria-label="Thẻ tiếp theo"
              >
                <ChevronRight />
              </Button>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Phím tắt: Space lật · 1 chưa thuộc · 2 đã thuộc · ← →
            </p>

            {customCards.some(
              (customCard) =>
                customCard.hanzi ===
                card.hanzi,
            ) && (
              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-sm text-destructive hover:text-destructive"
                  onClick={() =>
                    deleteCustomCard(card)
                  }
                >
                  <Trash2 aria-hidden />
                  Xóa thẻ tự tạo
                </Button>
              </div>
            )}
          </>
        )
      )}
    </div>
  )
}