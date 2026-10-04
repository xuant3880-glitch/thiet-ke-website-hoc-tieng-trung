import type { PlanId } from './pricing'
import { PLANS, getPlanById } from './pricing'
import { getCurrentUserId } from './auth'

export type Subscription = {
  planId: PlanId
  startDate: string
  endDate: string | null
  isActive: boolean
}

const KEY_PREFIX = 'hnd-subscription-v1'

const EMPTY: Subscription = {
  planId: 'free',
  startDate: new Date().toISOString(),
  endDate: null,
  isActive: true,
}

function getKey(userId: string | null): string {
  return userId ? `${KEY_PREFIX}-${userId}` : KEY_PREFIX
}

export function loadSubscription(): Subscription {
  if (typeof window === 'undefined') return { ...EMPTY }

  const userId = getCurrentUserId()
  const key = getKey(userId)

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as Partial<Subscription>
    return {
      ...EMPTY,
      ...parsed,
      planId: parsed.planId || 'free',
      startDate: parsed.startDate || new Date().toISOString(),
      endDate: parsed.endDate || null,
      isActive: parsed.isActive ?? true,
    }
  } catch {
    return { ...EMPTY }
  }
}

export function saveSubscription(subscription: Subscription) {
  const userId = getCurrentUserId()
  const key = getKey(userId)
  localStorage.setItem(key, JSON.stringify(subscription))
  window.dispatchEvent(new Event('hnd-subscription'))
}

export function upgradeSubscription(planId: PlanId): Subscription {
  const subscription = loadSubscription()
  const plan = getPlanById(planId)

  if (!plan) return subscription

  const now = new Date()
  let endDate: string | null = null

  if (plan.period === 'month') {
    const end = new Date(now)
    end.setMonth(end.getMonth() + 1)
    endDate = end.toISOString()
  } else if (plan.period === 'year') {
    const end = new Date(now)
    end.setFullYear(end.getFullYear() + 1)
    endDate = end.toISOString()
  }

  const newSubscription: Subscription = {
    planId,
    startDate: now.toISOString(),
    endDate,
    isActive: true,
  }

  saveSubscription(newSubscription)
  return newSubscription
}

export function isSubscriptionExpired(): boolean {
  const subscription = loadSubscription()
  if (!subscription.endDate) return false

  const now = new Date()
  const end = new Date(subscription.endDate)
  return now > end
}

export function canAccessLevel(level: number | 'all'): boolean {
  if (level === 'all') {
    const subscription = loadSubscription()
    const plan = getPlanById(subscription.planId)
    if (!plan) return false
    if (isSubscriptionExpired()) return false
    return plan.maxLevel >= 9
  }

  const subscription = loadSubscription()
  const plan = getPlanById(subscription.planId)

  if (!plan) return false
  if (isSubscriptionExpired()) return level <= 2

  return level <= plan.maxLevel
}

export function getCurrentMaxLevel(): number {
  const subscription = loadSubscription()
  const plan = getPlanById(subscription.planId)

  if (!plan) return 2
  if (isSubscriptionExpired()) return 2

  return plan.maxLevel
}

export function getDaysRemaining(): number {
  const subscription = loadSubscription()
  if (!subscription.endDate) return -1

  const now = new Date()
  const end = new Date(subscription.endDate)
  const diff = end.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  return days > 0 ? days : 0
}
