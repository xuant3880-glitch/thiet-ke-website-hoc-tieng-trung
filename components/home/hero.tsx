import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SpeakButton } from '@/components/speak-button'
import { HeroArt } from '@/components/home/hero-art'
import { WORDS } from '@/lib/vocab'

const stats = [
  { value: `${WORDS.length}+`, label: 'Từ vựng HSK' },
  { value: '7', label: 'Công cụ học' },
  { value: '24/7', label: 'Gia sư AI' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            Học tiếng Trung thông minh cùng AI
          </p>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Chinh phục tiếng Trung{' '}
            <span className="font-serif text-primary">从零开始</span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Từ vựng HSK, luyện viết chữ Hán theo thứ tự nét, phát âm chuẩn, hội thoại thực tế và gia sư AI — tất cả
            trong một nơi, hoàn toàn bằng tiếng Việt.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-5 text-base" render={<Link href="/tu-vung" />} nativeButton={false}>
              Bắt đầu học
              <ArrowRight aria-hidden />
            </Button>
            <Button size="lg" className="h-11 px-5 text-base" variant="outline" render={<Link href="/gia-su-ai" />} nativeButton={false}>
              Hỏi gia sư AI
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-primary/40 pl-3">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-2xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl">
            <HeroArt />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lg md:-left-8">
            <span lang="zh-CN" className="font-serif text-5xl font-bold text-primary">
              学
            </span>
            <div>
              <p className="text-sm font-semibold">xué</p>
              <p className="text-sm text-muted-foreground">học, học tập</p>
            </div>
            <SpeakButton text="学" />
          </div>
        </div>
      </div>
    </section>
  )
}
