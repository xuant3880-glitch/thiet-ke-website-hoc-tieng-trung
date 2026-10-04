import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ToneSection } from '@/components/pronunciation/tone-section'
import { PinyinTable } from '@/components/pronunciation/pinyin-table'

export const metadata: Metadata = {
  title: 'Phát âm & Pinyin',
  description: 'Học 4 thanh điệu, thanh mẫu và vận mẫu pinyin tiếng Trung có âm thanh minh họa.',
}

export default function PronunciationPage() {
  return (
    <>
      <PageHeader
        hanzi="发音"
        title="Phát âm & Pinyin"
        description="Pinyin là hệ thống phiên âm Latin của tiếng Trung. Nắm vững thanh điệu, thanh mẫu và vận mẫu là nền móng để nói chuẩn."
      />
      <ToneSection />
      <PinyinTable />
    </>
  )
}
