export type PlanId = 'free' | 'basic' | 'standard' | 'premium' | 'yearly'

export type Plan = {
  id: PlanId
  name: string
  price: number
  period: 'month' | 'year' | 'lifetime'
  features: string[]
  maxLevel: number
  isPopular?: boolean
  isYearly?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Miễn phí',
    price: 0,
    period: 'lifetime',
    maxLevel: 2,
    features: [
      'Học HSK 1-2 hoàn toàn miễn phí',
      'Truy cập toàn bộ từ vựng HSK 1-2',
      'Luyện flashcard HSK 1-2',
      'Phát âm và Pinyin cơ bản',
      'Luyện viết chữ Hán HSK 1-2',
      'Hội thoại tình huống cơ bản',
    ],
  },
  {
    id: 'basic',
    name: 'Cơ bản',
    price: 29000,
    period: 'month',
    maxLevel: 4,
    features: [
      'Tất cả tính năng miễn phí',
      'Mở rộng HSK 3-4',
      'Từ vựng nâng cao (hơn 600 từ)',
      'Flashcard HSK 3-4',
      'Trắc nghiệm HSK 3-4',
      'Gia sư AI giới hạn (20 câu/ngày)',
    ],
  },
  {
    id: 'standard',
    name: 'Tiêu chuẩn',
    price: 59000,
    period: 'month',
    maxLevel: 6,
    isPopular: true,
    features: [
      'Tất cả tính năng Cơ bản',
      'Mở rộng HSK 5-6',
      'Từ vựng chuyên sâu (hơn 1000 từ)',
      'Flashcard HSK 5-6',
      'Trắc nghiệm HSK 5-6',
      'Gia sư AI không giới hạn',
      'Hội thoại nâng cao',
    ],
  },
  {
    id: 'premium',
    name: 'Cao cấp',
    price: 199000,
    period: 'month',
    maxLevel: 9,
    features: [
      'Tất cả tính năng Tiêu chuẩn',
      'Mở rộng HSK 7-9',
      'Từ vựng chuyên gia (hơn 1500 từ)',
      'Flashcard HSK 7-9',
      'Trắc nghiệm HSK 7-9',
      'Gia sư AI ưu tiên',
      'Phát âm chuẩn native',
      'Hội thoại tình huống phức tạp',
    ],
  },
  {
    id: 'yearly',
    name: 'Năm',
    price: 199000,
    period: 'year',
    maxLevel: 9,
    isYearly: true,
    features: [
      'Tất cả tính năng Cao cấp',
      'Truy cập HSK 1-9 toàn bộ',
      'Giá tiết kiệm 92% so với tháng',
      'Hỗ trợ ưu tiên',
      'Cập nhật nội dung mới nhất',
    ],
  },
]

export function getPlanById(id: PlanId): Plan | undefined {
  return PLANS.find((plan) => plan.id === id)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price)
}

export function getDiscount(plan: Plan): number {
  if (plan.id === 'yearly') {
    const monthlyEquivalent = 199000 * 12
    return Math.round(((monthlyEquivalent - plan.price) / monthlyEquivalent) * 100)
  }
  return 0
}
