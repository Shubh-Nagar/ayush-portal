import { useEffect, useMemo, useState } from 'react'
import { Library } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SearchBar } from '@/components/search/SearchBar'
import { SearchFiltersPanel } from '@/components/search/SearchFilters'
import { ResearchCard } from '@/components/search/ResearchCard'
import { Skeleton } from '@/components/common/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { search, type SearchResponse } from '@/services/api'
import { useSearchStore } from '@/store/searchStore'

/** Browse the full evidence library. Same engine as search, no query required. */
export function ResearchLibraryPage() {
  const { query, filters } = useSearchStore()
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const libraryFilters = useMemo(
    () => ({ ...filters, contentType: 'research' as const }),
    [filters]
  )

  useEffect(() => {
    setLoading(true)
    search(query, libraryFilters).then((res) => {
      setData(res)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(libraryFilters)])

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron-600">
            <Library className="h-4 w-4" aria-hidden /> Research Library
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Evidence-graded research library</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse and filter peer-reviewed studies and reviews across all AYUSH systems. Refine by
            evidence level, system, year and access type.
          </p>
          <div className="mt-6 max-w-xl">
            <SearchBar size="md" onSubmit={() => {}} />
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SearchFiltersPanel />
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm text-slate-500">
              {loading ? 'Loading…' : `${data?.articles.length ?? 0} articles`}
            </p>
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-navy/10 bg-white p-5">
                    <Skeleton className="mb-3 h-5 w-24" />
                    <Skeleton className="mb-2 h-6 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : data && data.articles.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {data.articles.map((a) => (
                  <ResearchCard key={a.id} article={a} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing matches those filters"
                message="Try removing a filter or broadening your search terms."
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
