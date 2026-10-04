import { Hero } from '@/components/home/hero'
import { StudyStats } from '@/components/home/study-stats'
import { FeatureGrid } from '@/components/home/feature-grid'
import { LevelOverview } from '@/components/home/level-overview'
import { CtaBanner } from '@/components/home/cta-banner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudyStats />
      <FeatureGrid />
      <LevelOverview />
      <CtaBanner />
    </>
  )
}
