import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { DialogueViewer } from '@/components/dialogue/dialogue-viewer'

export const metadata: Metadata = {
  title: 'Hội thoại tình huống',
  description: 'Luyện nghe và nói tiếng Trung qua các đoạn hội thoại thực tế kèm pinyin và bản dịch tiếng Việt.',
}

export default function DialoguePage() {
  return (
    <>
      <PageHeader
        hanzi="对话"
        title="Hội thoại tình huống"
        description="Nghe từng câu hoặc cả đoạn, ẩn/hiện pinyin và bản dịch để tự kiểm tra khả năng hiểu."
      />
      <DialogueViewer />
    </>
  )
}
