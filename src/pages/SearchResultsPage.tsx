import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle, SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SearchBar } from '@/components/search/SearchBar'
import { SearchFiltersPanel } from '@/components/search/SearchFilters'
import { ResearchCard } from '@/components/search/ResearchCard'
import { TrialCard } from '@/components/search/TrialCard'
import { Skeleton } from '@/components/common/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { EvidenceBadge } from '@/components/common/EvidenceBadge'
import { search, type SearchResponse } from '@/services/api'
import { useSearchStore } from '@/store/searchStore'

export function SearchResultsPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const { filters, setQuery } = useSearchStore()
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setQuery(query)
    setLoading(true)
    search(query, filters).then((res) => {
      setData(res)
      setLoading(false)
    })
    // Re-run whenever the query or any filter changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(filters)])

  return (
    <div className="bg-paper pb-16">
      {/* Search header */}
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-6">
          <SearchBar size="md" onSubmit={(q) => setParams({ q })} />
        </Container>
      </div>

      <Container className="pt-6">
        {/* Verdict banner — the plain-language answer */}
        {!loading && data && query && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 sm:p-5 ${
              data.verdict.hasEvidence
                ? 'border-india-100 bg-india-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            {data.verdict.hasEvidence ? (
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-india" aria-hidden />
            ) : (
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-slate-400" aria-hidden />
            )}
            <div className="flex-1">
              <p className="font-medium text-navy">{data.verdict.summary}</p>
              {data.verdict.hasEvidence && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span>{data.total} matching records ·</span>
                  {data.verdict.strongest && (
                    <>
                      <span>strongest available:</span>
                      <EvidenceBadge level={data.verdict.strongest} size="sm" showLabel />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters — desktop sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SearchFiltersPanel />
            </div>
          </div>

          {/* Filters — mobile toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy/15 bg-white py-2.5 text-sm font-medium text-navy"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            {showFilters && (
              <div className="mb-6">
                <SearchFiltersPanel />
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            {loading ? (
              <div className="space-y-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-navy/10 bg-white p-5">
                    <Skeleton className="mb-3 h-5 w-32" />
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : !data || data.total === 0 ? (
              <EmptyState
                title="No matching evidence"
                message={
                  query
                    ? 'Try a broader term, a related herb, or remove some filters.'
                    : 'Start by searching for a herb, medicine, disease or treatment.'
                }
              />
            ) : (
              <div className="space-y-8">
                {data.articles.length > 0 && (
                  <section>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Research articles ({data.articles.length})
                    </h2>
                    <div className="space-y-5">
                      {data.articles.map((a) => (
                        <ResearchCard key={a.id} article={a} />
                      ))}
                    </div>
                  </section>
                )}

                {data.trials.length > 0 && (
                  <section>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Clinical trials ({data.trials.length})
                    </h2>
                    <div className="space-y-5">
                      {data.trials.map((t) => (
                        <TrialCard key={t.id} trial={t} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
