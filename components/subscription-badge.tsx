'use client'

import { useEffect, useState } from 'react'
import { Crown, Lock } from 'lucide-react'
import { loadSubscription, getCurrentMaxLevel, getDaysRemaining } from '@/lib/subscription'
import { getPlanById, formatPrice } from '@/lib/pricing'
import { cn } from '@/lib/utils'

export function SubscriptionBadge() {
  const [maxLevel, setMaxLevel] = useState(getCurrentMaxLevel())
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemaining())

  useEffect(() => {
    const handleStorageChange = () => {
      setMaxLevel(getCurrentMaxLevel())
      setDaysRemaining(getDaysRemaining())
    }

    window.addEventListener('hnd-subscription', handleStorageChange)
    return () => window.removeEventListener('hnd-subscription', handleStorageChange)
  }, [])

  const subscription = loadSubscription()
  const plan = getPlanById(subscription.planId)

  if (!plan) return null

  const isFree = plan.id === 'free'
  const isExpired = daysRemaining === 0 && !isFree

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium',
        isFree
          ? 'bg-secondary text-muted-foreground'
          : isExpired
            ? 'bg-destructive/10 text-destructive'
            : 'bg-primary/10 text-primary',
      )}
    >
      {isFree ? (
        <Lock className="h-3.5 w-3.5" />
      ) : (
        <Crown className="h-3.5 w-3.5" />
      )}
      <span>
        {isExpired ? 'Hết hạn' : plan.name} (HSK 1-{maxLevel}
        {!isFree && daysRemaining > 0 && `, còn ${daysRemaining} ngày`})
      </span>
    </div>
  )
}
