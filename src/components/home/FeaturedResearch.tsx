import { useEffect, useState } from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ResearchCard } from '@/components/search/ResearchCard'
import { Skeleton } from '@/components/common/Skeleton'
import { LinkButton } from '@/components/common/Button'
import { getFeaturedResearch } from '@/services/api'
import type { ResearchArticle } from '@/types'

export function FeaturedResearch() {
  const [articles, setArticles] = useState<ResearchArticle[] | null>(null)

  useEffect(() => {
    getFeaturedResearch(6).then(setArticles)
  }, [])

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Highest-graded studies"
            title="Featured evidence"
            description="A selection of the strongest research currently indexed on the portal."
          />
          <LinkButton to="/research" variant="outline" size="sm">
            View all research
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles
            ? articles.map((a) => <ResearchCard key={a.id} article={a} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <Skeleton className="mb-3 h-5 w-24" />
                  <Skeleton className="mb-2 h-5 w-full" />
                  <Skeleton className="mb-4 h-5 w-4/5" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
        </div>
      </Container>
    </section>
  )
}
