import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { WritingPractice } from '@/components/writing/writing-practice'

export const metadata: Metadata = {
  title: 'Luyện viết chữ Hán',
  description: 'Xem hoạt ảnh thứ tự nét và tự viết chữ Hán trên ô mễ tự, được chấm từng nét.',
}

export default function WritingPage() {
  return (
    <>
      <PageHeader
        hanzi="写字"
        title="Luyện viết chữ Hán"
        description="Xem thứ tự nét chuẩn, sau đó tự viết bằng chuột hoặc ngón tay. Hệ thống sẽ kiểm tra từng nét bạn vẽ."
      />
      <WritingPractice />
    </>
  )
}
