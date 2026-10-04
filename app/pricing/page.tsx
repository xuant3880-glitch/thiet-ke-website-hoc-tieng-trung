'use client'

import { useState } from 'react'
import { Check, Lock } from 'lucide-react'
import { PLANS, formatPrice, getDiscount, type PlanId } from '@/lib/pricing'
import { upgradeSubscription, canAccessLevel, getCurrentMaxLevel } from '@/lib/subscription'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'

export default function PricingPage() {
  const [currentMaxLevel, setCurrentMaxLevel] = useState(getCurrentMaxLevel())
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)

  const handleUpgrade = (planId: PlanId) => {
    setSelectedPlan(planId)
    const subscription = upgradeSubscription(planId)
    setCurrentMaxLevel(getCurrentMaxLevel())

    alert(`Đã nâng cấp thành công lên gói ${PLANS.find((p) => p.id === planId)?.name}!`)
    setSelectedPlan(null)
  }

  return (
    <>
      <PageHeader
        hanzi="价格"
        title="Gói học theo cấp HSK"
        description="Chọn gói phù hợp với mục tiêu học tập của bạn. HSK 1-2 miễn phí, các cấp cao hơn cần đăng ký."
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Cấp độ hiện tại của bạn: <span className="font-semibold text-primary">HSK 1-{currentMaxLevel}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isLocked = plan.maxLevel > currentMaxLevel && plan.id !== 'free'
            const isCurrentPlan = plan.maxLevel === currentMaxLevel

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-card p-6 transition-all ${
                  plan.isPopular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Phổ biến nhất
                  </div>
                )}

                {plan.isYearly && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    Tiết kiệm {getDiscount(plan)}%
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                    {plan.period === 'month' && <span className="text-muted-foreground">/tháng</span>}
                    {plan.period === 'year' && <span className="text-muted-foreground">/năm</span>}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Truy cập HSK 1-{plan.maxLevel}
                  </p>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isCurrentPlan ? 'outline' : 'default'}
                  disabled={isCurrentPlan || selectedPlan === plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isCurrentPlan ? 'Đang sử dụng' : isLocked ? 'Nâng cấp' : 'Chọn gói'}
                  {selectedPlan === plan.id && '...'}
                </Button>

                {isLocked && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Cần nâng cấp để mở khóa</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-6 text-center">
          <h3 className="text-lg font-semibold">Câu hỏi thường gặp</h3>
          <div className="mt-4 space-y-3 text-left text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">HSK 1-2 có thực sự miễn phí?</p>
              <p>Có, bạn có thể học HSK 1-2 hoàn toàn miễn phí vĩnh viễn với đầy đủ tính năng.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Tôi có thể nâng cấp sau không?</p>
              <p>Có, bạn có thể nâng cấp bất cứ lúc nào. Dữ liệu học tập của bạn sẽ được giữ lại.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Gói năm có tiết kiệm không?</p>
              <p>
                Có, gói năm chỉ 199.000đ (so với 2.388.000đ nếu trả theo tháng), tiết kiệm đến 92%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
