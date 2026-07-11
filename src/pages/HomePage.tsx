import { Hero } from '@/components/home/Hero'
import { EvidenceExplainer } from '@/components/home/EvidenceExplainer'
import { SystemsGrid } from '@/components/home/SystemsGrid'
import { FeaturedResearch } from '@/components/home/FeaturedResearch'
import { AIFeatures } from '@/components/home/AIFeatures'

export function HomePage() {
  return (
    <>
      <Hero />
      <EvidenceExplainer />
      <SystemsGrid />
      <FeaturedResearch />
      <AIFeatures />
    </>
  )
}
