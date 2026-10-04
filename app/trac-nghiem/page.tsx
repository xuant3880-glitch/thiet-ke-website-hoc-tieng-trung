import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { QuizGame } from '@/components/quiz/quiz-game'

export const metadata: Metadata = {
  title: 'Trắc nghiệm tiếng Trung',
  description:
    'Kiểm tra từ vựng HSK với 3 dạng câu hỏi: nghĩa, pinyin và nghe hiểu.',
}

export default function QuizPage() {
  return (
    <main className="min-h-screen font-sans">
      <PageHeader
        hanzi="测验"
        title="Trắc nghiệm"
        description="10 câu hỏi ngẫu nhiên mỗi lượt, kết hợp đoán nghĩa, chọn pinyin và nghe chọn chữ."
      />

      <QuizGame />
    </main>
  )
}
