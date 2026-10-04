import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/nav'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-2xl font-bold text-primary">汉语堂</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {'Hán Ngữ Đường — học tiếng Trung mỗi ngày một chút. "千里之行，始于足下" — Hành trình ngàn dặm bắt đầu từ một bước chân.'}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Hán Ngữ Đường</p>
        </div>
        <nav aria-label="Liên kết chân trang">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Trang chủ
              </Link>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
