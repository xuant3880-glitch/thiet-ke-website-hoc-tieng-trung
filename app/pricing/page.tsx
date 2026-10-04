'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Lock, X, MessageCircle } from 'lucide-react'
import { PLANS, formatPrice, getDiscount, type PlanId } from '@/lib/pricing'
import { getCurrentMaxLevel } from '@/lib/subscription'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'

export default function PricingPage() {
  const [currentMaxLevel] = useState(getCurrentMaxLevel())
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null)

  const selectedPlanData = selectedPlan
    ? PLANS.find((plan) => plan.id === selectedPlan)
    : null

  const handleUpgrade = (planId: PlanId) => {
    setSelectedPlan(planId)
  }

  return (
    <>
      <PageHeader
        title="Chọn gói học phù hợp"
        hanzi="选择适合你的学习套餐"
        description="Mở khóa thêm nội dung và tính năng để học tiếng Trung hiệu quả hơn."
      />

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const isCurrentPlan = currentMaxLevel >= plan.maxLevel
            const discount = getDiscount(plan)

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${
                  plan.isPopular
                    ? 'border-primary ring-2 ring-primary/20'
                    : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Phổ biến nhất
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{plan.name}</h2>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-3xl font-bold">
                      {formatPrice(plan.price)}
                    </span>

                    {plan.period === 'month' && (
                      <span className="pb-1 text-sm text-muted-foreground">
                        /tháng
                      </span>
                    )}

                    {plan.period === 'year' && (
                      <span className="pb-1 text-sm text-muted-foreground">
                        /năm
                      </span>
                    )}
                  </div>

                  {plan.isYearly && discount > 0 && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                      Tiết kiệm {discount}% so với gói tháng
                    </p>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.isYearly && (
                  <div className="mt-5 rounded-lg bg-green-500/10 p-3 text-center text-sm">
                    🎁 <strong>Ưu đãi gói năm</strong>
                    <br />
                    Bạn được yêu cầu thêm{' '}
                    <strong>1 chức năng tùy thích</strong>.
                    <br />
                    Liên hệ Admin để yêu cầu.
                  </div>
                )}

                <Button
                  className="mt-6 w-full"
                  variant={isCurrentPlan ? 'outline' : 'default'}
                  disabled={isCurrentPlan}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {isCurrentPlan ? 'Đang dùng' : 'Mua ngay'}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-xl border bg-muted/30 p-5 text-center">
          <Lock className="mx-auto mb-2 h-5 w-5" />
          <p className="text-sm text-muted-foreground">
            Sau khi thanh toán, vui lòng liên hệ Admin để xác nhận giao dịch
            và kích hoạt gói học.
          </p>
        </div>
      </main>

      {selectedPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <h2 className="text-2xl font-bold">
                Thanh toán {selectedPlanData.name}
              </h2>

              <p className="mt-2 text-muted-foreground">
                Số tiền cần chuyển:{' '}
                <strong>{formatPrice(selectedPlanData.price)}</strong>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-xl border bg-white">
                <Image
                  src="/payment/qr-thanh-toan.png"
                  alt="QR thanh toán"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p>
                <strong>1.</strong> Quét mã QR để chuyển khoản.
              </p>

              <p>
                <strong>2.</strong> Chuyển đúng số tiền của gói đã chọn.
              </p>

              <p>
                <strong>3.</strong> Chụp lại màn hình giao dịch thành công.
              </p>

              <p>
                <strong>4.</strong> Liên hệ Admin và gửi ảnh giao dịch để được
                kích hoạt gói.
              </p>
            </div>

            {selectedPlanData.isYearly && (
              <div className="mt-5 rounded-lg bg-green-500/10 p-4 text-sm">
                🎁 <strong>Quyền lợi đặc biệt:</strong> khách mua gói năm được
                yêu cầu thêm 1 chức năng tùy thích. Admin sẽ xem xét và triển
                khai chức năng phù hợp.
              </div>
            )}

            <Button
              className="mt-6 w-full"
              onClick={() => {
                alert(
                  'Vui lòng liên hệ Admin để gửi ảnh giao dịch và yêu cầu kích hoạt gói học.'
                )
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Liên hệ Admin xác nhận
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Gói học chỉ được kích hoạt sau khi Admin xác nhận thanh toán.
            </p>
          </div>
        </div>
      )}
    </>
  )
}



