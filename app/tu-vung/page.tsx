import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { VocabBrowser } from '@/components/vocab/vocab-browser'
import type { LevelValue } from '@/components/level-picker'

export const metadata: Metadata = {
  title: 'Từ vựng HSK',
  description: 'Kho từ vựng tiếng Trung HSK 1–9 kèm pinyin, nghĩa tiếng Việt và phát âm chuẩn.',
}

export default async function VocabPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>
}) {
  const { level } = await searchParams
  const levelNum = Number(level)
  const initialLevel: LevelValue =
    levelNum >= 1 && levelNum <= 9 ? (levelNum as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) : 'all'

  return (
    <>
      <PageHeader
        hanzi="词汇"
        title="Kho từ vựng HSK"
        description="Tra cứu nhanh theo chữ Hán, pinyin hoặc nghĩa tiếng Việt. Bấm biểu tượng loa để nghe phát âm chuẩn giọng Bắc Kinh."
      />
      <VocabBrowser initialLevel={initialLevel} />
    </>
  )
}
