'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem('hnd-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('hnd-theme', next)
    applyTheme(next)
    window.dispatchEvent(new Event('hnd-theme'))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-secondary"
      aria-label={theme === 'dark' ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
