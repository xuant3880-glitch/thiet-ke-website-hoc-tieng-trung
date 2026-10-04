import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/nav'

export function FeatureGrid() {
  return (
    <section aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <p className="font-serif text-sm font-semibold tracking-[0.3em] text-primary">功能</p>
        <h2 id="features-title" className="mt-2 text-balance text-3xl font-bold tracking-tight">
          Mọi thứ bạn cần để thành thạo tiếng Trung
        </h2>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon
          return (
            <li key={item.href} className={i === 0 ? 'lg:col-span-2' : undefined}>
              <Link
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 font-serif text-7xl font-bold text-primary/[0.06] transition-colors group-hover:text-primary/15"
                >
                  {item.hanzi}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
                  {item.label}
                  <ArrowUpRight
                    className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
