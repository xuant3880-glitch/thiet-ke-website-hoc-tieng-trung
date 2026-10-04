type PageHeaderProps = {
  hanzi: string
  title: string
  description: string
}

export function PageHeader({ hanzi, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-secondary/40">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[10rem] font-bold leading-none text-primary/[0.07] md:text-[14rem]"
      >
        {hanzi}
      </span>
      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        <p className="font-serif text-sm font-semibold tracking-[0.3em] text-primary">{hanzi}</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
