'use client'

import { Lock, Crown } from 'lucide-react'
import { canAccessLevel, getCurrentMaxLevel } from '@/lib/subscription'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LockOverlayProps {
  level: number | 'all'
  children: React.ReactNode
}

export function LockOverlay({ level, children }: LockOverlayProps) {
  const canAccess = canAccessLevel(level)

  if (canAccess) {
    return <>{children}</>
  }

  const maxLevel = getCurrentMaxLevel()

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center shadow-lg">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Nội dung khóa</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {level === 'all' ? 'Truy cập tất cả cấp độ' : `HSK ${level}`} chỉ dành cho gói trả phí
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Bạn đang có quyền truy cập HSK 1-{maxLevel}
            </p>
          </div>
          <Link href="/pricing">
            <Button className="gap-2">
              <Crown className="h-4 w-4" />
              Nâng cấp ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
