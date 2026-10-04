import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { TutorChat } from '@/components/tutor/tutor-chat'

export const metadata: Metadata = {
  title: 'Gia sư AI',
  description: 'Hỏi đáp ngữ pháp, dịch câu, sửa lỗi và luyện hội thoại tiếng Trung với gia sư AI.',
}

export default function TutorPage() {
  return (
    <>
      <PageHeader
        hanzi="老师"
        title="Gia sư AI"
        description="Hỏi bất cứ điều gì về tiếng Trung: giải thích ngữ pháp, dịch câu, sửa bài viết hay đóng vai luyện nói."
      />
      <TutorChat />
    </>
  )
}
