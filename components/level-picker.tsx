'use client'

import type { HskLevel } from '@/lib/vocab'
import { cn } from '@/lib/utils'

export type LevelValue = HskLevel | 'all' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const OPTIONS: { value: LevelValue; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 1, label: 'HSK 1' },
  { value: 2, label: 'HSK 2' },
  { value: 3, label: 'HSK 3' },
  { value: 4, label: 'HSK 4' },
  { value: 5, label: 'HSK 5' },
  { value: 6, label: 'HSK 6' },
  { value: 7, label: 'HSK 7' },
  { value: 8, label: 'HSK 8' },
  { value: 9, label: 'HSK 9' },
]

export function LevelPicker({
  value,
  onChange,
  label = 'Chọn cấp độ HSK',
}: {
  value: LevelValue
  onChange: (value: LevelValue) => void
  label?: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full bg-secondary p-1">
      {OPTIONS.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              active ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
