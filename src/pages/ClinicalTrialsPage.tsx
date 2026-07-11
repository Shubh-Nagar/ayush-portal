import { useEffect, useMemo, useState } from 'react'
import { FlaskConical } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { TrialCard } from '@/components/search/TrialCard'
import { Skeleton } from '@/components/common/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { getTrials } from '@/services/api'
import type { ClinicalTrial, TrialStatus } from '@/types'

const STATUS_TABS: (TrialStatus | 'All')[] = [
  'All',
  'Recruiting',
  'Ongoing',
  'Completed',
  'Not yet recruiting',
]

export function ClinicalTrialsPage() {
  const [trials, setTrials] = useState<ClinicalTrial[] | null>(null)
  const [tab, setTab] = useState<(typeof STATUS_TABS)[number]>('All')

  useEffect(() => {
    getTrials().then(setTrials)
  }, [])

  const filtered = useMemo(() => {
    if (!trials) return []
    return tab === 'All' ? trials : trials.filter((t) => t.status === tab)
  }, [trials, tab])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: trials?.length ?? 0 }
    trials?.forEach((t) => {
      map[t.status] = (map[t.status] ?? 0) + 1
    })
    return map
  }, [trials])

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron-600">
            <FlaskConical className="h-4 w-4" aria-hidden /> Clinical Trials
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">AYUSH clinical trials registry</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore registered clinical trials across the AYUSH systems, mirrored from the Clinical
            Trials Registry — India (CTRI). Filter by recruitment status.
          </p>
        </Container>
      </div>

      <Container className="pt-8">
        {/* Status tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === s
                  ? 'border-navy bg-navy text-white'
                  : 'border-navy/15 bg-white text-slate-600 hover:bg-navy-50'
              }`}
            >
              {s}
              {counts[s] != null && (
                <span className={`ml-1.5 ${tab === s ? 'text-white/70' : 'text-slate-400'}`}>
                  {counts[s]}
                </span>
              )}
            </button>
          ))}
        </div>

        {!trials ? (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((t) => (
              <TrialCard key={t.id} trial={t} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No trials in this category"
            message="Try a different recruitment status."
            icon={FlaskConical}
          />
        )}
      </Container>
    </div>
  )
}
