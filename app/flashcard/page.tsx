import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { FlashcardDeck } from '@/components/flashcard/flashcard-deck'

export const metadata: Metadata = {
  title: 'Flashcard',
  description: 'Ôn tập từ vựng tiếng Trung bằng thẻ ghi nhớ lật hai mặt.',
}

export default function FlashcardPage() {
  return (
    <>
      <PageHeader
        hanzi="卡片"
        title="Flashcard ghi nhớ"
        description="Nhìn chữ Hán, đoán nghĩa rồi lật thẻ để kiểm tra. Phím tắt: Space để lật, ← → để chuyển thẻ."
      />
      <FlashcardDeck />
    </>
  )
}
