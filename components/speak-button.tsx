'use client'

import { Volume2 } from 'lucide-react'
import { speakChinese } from '@/lib/speak'
import { cn } from '@/lib/utils'

type SpeakButtonProps = {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'size-8 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-5',
  lg: 'size-12 [&_svg]:size-6',
}

export function SpeakButton({ text, className, size = 'md' }: SpeakButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speakChinese(text)
      }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2',
        sizes[size],
        className,
      )}
    >
      <Volume2 aria-hidden />
      <span className="sr-only">{`Phát âm ${text}`}</span>
    </button>
  )
}
