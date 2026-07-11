import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { ResearchCard } from '@/components/search/ResearchCard'
import { EmptyState } from '@/components/common/EmptyState'
import { LinkButton } from '@/components/common/Button'
import { getSystemBySlug } from '@/data/systems'
import { RESEARCH } from '@/data/research'
import { formatNumber } from '@/lib/utils'

export function SystemPage() {
  const { slug } = useParams()
  const system = slug ? getSystemBySlug(slug) : undefined
  const [visible, setVisible] = useState(4)

  useEffect(() => {
    setVisible(4)
  }, [slug])

  if (!system) {
    return (
      <Container className="py-16">
        <EmptyState title="System not found" message="This system of medicine could not be found." />
      </Container>
    )
  }

  const articles = RESEARCH.filter((a) => a.system === system.name)

  return (
    <div className="bg-paper pb-16">
      {/* Hero band */}
      <div className="border-b border-navy/10 bg-navy text-white">
        <Container className="py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All systems
          </Link>
          <div className="mt-6 max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-saffron">
              System of Medicine
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">{system.name}</h1>
            <p className="mt-2 text-lg text-saffron/90">{system.tagline}</p>
            <p className="mt-4 text-white/80">{system.description}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4" aria-hidden /> Origin: {system.origin}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/5 px-5 py-3">
              <p className="text-2xl font-semibold text-white">
                {formatNumber(system.researchCount)}
              </p>
              <p className="text-xs text-white/60">Research articles</p>
            </div>
            <div className="rounded-xl bg-white/5 px-5 py-3">
              <p className="text-2xl font-semibold text-white">
                {formatNumber(system.trialCount)}
              </p>
              <p className="text-xs text-white/60">Clinical trials</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-10">
        {/* Key research areas */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold">Key research areas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {system.keyAreas.map((area) => (
              <Link key={area} to={`/search?q=${encodeURIComponent(area)}`}>
                <Badge tone="saffron" className="cursor-pointer px-3 py-1.5 text-sm">
                  {area}
                </Badge>
              </Link>
            ))}
          </div>
        </section>

        {/* Research from this system */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Research in {system.name}</h2>
            <LinkButton to="/research" variant="outline" size="sm">
              Full library <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </div>

          {articles.length ? (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                {articles.slice(0, visible).map((a) => (
                  <ResearchCard key={a.id} article={a} />
                ))}
              </div>
              {visible < articles.length && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setVisible((v) => v + 4)}
                    className="rounded-lg border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy-50"
                  >
                    Load more studies
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No indexed studies yet"
              message={`Research for ${system.name} is being added to the portal.`}
            />
          )}
        </section>
      </Container>
    </div>
  )
}
