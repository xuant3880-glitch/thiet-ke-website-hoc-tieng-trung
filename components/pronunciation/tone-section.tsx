'use client'

import { Volume2 } from 'lucide-react'
import { speakChinese } from '@/lib/speak'

const TONES = [
  { no: 1, name: 'Thanh 1', mark: 'mā', hanzi: '妈', meaning: 'mẹ', tip: 'Cao và ngang, giữ đều giọng (giống thanh ngang tiếng Việt nhưng cao hơn).', path: 'M10 15 L90 15' },
  { no: 2, name: 'Thanh 2', mark: 'má', hanzi: '麻', meaning: 'cây gai', tip: 'Đi lên từ trung bình tới cao, giống thanh sắc tiếng Việt.', path: 'M10 50 L90 12' },
  { no: 3, name: 'Thanh 3', mark: 'mǎ', hanzi: '马', meaning: 'con ngựa', tip: 'Xuống thấp rồi lên lại, gần giống thanh hỏi tiếng Việt.', path: 'M10 35 Q45 85 90 22' },
  { no: 4, name: 'Thanh 4', mark: 'mà', hanzi: '骂', meaning: 'mắng', tip: 'Rơi mạnh từ cao xuống thấp, dứt khoát như thanh nặng.', path: 'M10 12 L90 70' },
]

export function ToneSection() {
  return (
    <section aria-labelledby="tones-title" className="mx-auto max-w-6xl px-4 py-10">
      <h2 id="tones-title" className="text-2xl font-bold">
        Bốn thanh điệu cơ bản
      </h2>
      <p className="mt-2 text-muted-foreground">
        Cùng một âm “ma” nhưng khác thanh điệu sẽ thành từ khác hẳn nghĩa. Bấm vào thẻ để nghe.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TONES.map((t) => (
          <li key={t.no}>
            <button
              type="button"
              onClick={() => speakChinese(t.hanzi, 0.6)}
              className="group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">{t.name}</span>
                <Volume2 className="size-5 text-primary" aria-hidden />
              </div>
              <svg viewBox="0 0 100 80" className="mt-3 h-20 w-full" aria-hidden>
                {[15, 32, 50, 68].map((y) => (
                  <line key={y} x1="0" x2="100" y1={y} y2={y} className="stroke-border" strokeDasharray="2 3" />
                ))}
                <path d={t.path} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-primary" />
              </svg>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{t.mark}</span>
                <span lang="zh-CN" className="font-serif text-3xl font-bold">
                  {t.hanzi}
                </span>
                <span className="text-sm text-muted-foreground">{t.meaning}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.tip}</p>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed">
        <strong>Thanh nhẹ:</strong> {'đọc ngắn và nhẹ, không có dấu. Ví dụ: 妈妈 (māma), 你们 (nǐmen). '}
        <strong>Biến điệu:</strong> {'hai thanh 3 đứng liền nhau thì thanh đầu đọc thành thanh 2: 你好 nǐ hǎo → ní hǎo.'}
      </p>
    </section>
  )
}
