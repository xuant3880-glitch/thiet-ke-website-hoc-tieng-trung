export function HeroArt() {
  return (
    <svg viewBox="0 0 640 480" className="size-full" role="img" aria-label="Minh họa núi thủy mặc và chữ 学">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
        <linearGradient id="ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.72" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#sky)" />
      <circle cx="492" cy="92" r="38" fill="var(--gold)" opacity="0.85" />
      <path
        d="M0 318 C90 250 150 270 230 300 C310 332 360 240 430 268 C510 300 560 250 640 286 L640 480 L0 480 Z"
        fill="var(--primary)"
        opacity="0.2"
      />
      <path
        d="M0 360 C80 300 170 340 250 350 C340 362 380 300 470 330 C540 352 590 318 640 340 L640 480 L0 480 Z"
        fill="var(--primary)"
        opacity="0.38"
      />
      <path
        d="M40 480 C70 390 120 350 180 360 C210 280 250 250 290 300 C330 250 360 210 400 280 C430 230 470 250 500 310 C540 270 580 300 620 360 L640 480 Z"
        fill="url(#ink)"
        opacity="0.55"
      />
      <path
        d="M0 410 C90 380 140 400 220 418 C310 438 360 390 450 410 C530 428 580 400 640 418 L640 480 L0 480 Z"
        fill="var(--background)"
        opacity="0.72"
      />
      <g fill="none" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1.2">
        <path d="M86 402 C110 370 138 378 150 402" />
        <path d="M118 410 C130 388 148 390 158 412" />
        <path d="M512 396 C534 360 568 368 582 400" />
      </g>
      <g transform="translate(248 148)">
        <rect x="0" y="0" width="144" height="144" rx="18" fill="var(--card)" fillOpacity="0.88" stroke="var(--border)" strokeWidth="2" />
        <text
          x="72"
          y="108"
          textAnchor="middle"
          fill="var(--primary)"
          style={{ fontSize: 92, fontFamily: 'var(--font-noto-serif-sc), serif', fontWeight: 700 }}
        >
          学
        </text>
      </g>
    </svg>
  )
}
