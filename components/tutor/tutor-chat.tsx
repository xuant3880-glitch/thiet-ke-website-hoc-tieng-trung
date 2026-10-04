'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { ArrowUp, Loader2, Sparkles, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { touchStudy } from '@/lib/progress'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Phân biệt 的, 得 và 地',
  'Dịch giúp: "Tôi muốn đi Bắc Kinh du lịch"',
  'Hãy đóng vai người bán hàng, tôi là khách mua trà sữa',
  'Sửa lỗi câu: 我昨天去了商店买东西了',
]

export function TutorChat() {
  const { messages, sendMessage, status, stop, error } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
    touchStudy()
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col px-4 py-8">
      <div className="flex min-h-[420px] flex-col rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6" aria-live="polite">
          {messages.length === 0 && (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="size-7" aria-hidden />
              </span>
              <p className="mt-4 text-lg font-semibold">你好！Mình là Lão sư Hán.</p>
              <p className="mt-1 text-sm text-muted-foreground">Chọn một gợi ý hoặc tự đặt câu hỏi nhé.</p>
              <ul className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => submit(s)}
                      className="h-full w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {messages.map((m) => {
            const isUser = m.role === 'user'
            return (
              <div key={m.id} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
                    isUser ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm bg-secondary',
                  )}
                >
                  {m.parts.map((part, i) =>
                    part.type === 'text' ? (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            )
          })}

          {status === 'submitted' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden /> Lão sư đang suy nghĩ…
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error.message || 'Có lỗi xảy ra, vui lòng thử lại.'}</p>}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-end gap-2 border-t border-border p-3"
        >
          <label htmlFor="tutor-input" className="sr-only">
            Nhập câu hỏi
          </label>
          <Textarea
            id="tutor-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                e.preventDefault()
                submit(input)
              }
            }}
            placeholder="Hỏi về ngữ pháp, từ vựng, dịch câu…"
            rows={1}
            className="max-h-40 min-h-11 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          {busy ? (
            <Button type="button" size="icon" variant="outline" onClick={() => stop()} aria-label="Dừng">
              <Square aria-hidden />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Gửi">
              <ArrowUp aria-hidden />
            </Button>
          )}
        </form>
      </div>
    </section>
  )
}
