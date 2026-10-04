import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-12 select-none font-serif text-[12rem] font-bold leading-none opacity-10"
        >
          加油
        </span>
        <div className="relative max-w-xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight">Mỗi ngày 15 phút, nói tiếng Trung tự tin</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            Kiểm tra trình độ ngay với bài trắc nghiệm nhanh, hoặc luyện hội thoại cùng gia sư AI.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" className="h-11 px-5 text-base" render={<Link href="/trac-nghiem" />} nativeButton={false}>
              Làm bài trắc nghiệm
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5 text-base border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<Link href="/flashcard" />}
              nativeButton={false}
            >
              Ôn bằng flashcard
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
