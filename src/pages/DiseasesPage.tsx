import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Search } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Skeleton } from '@/components/common/Skeleton'
import { getDiseases } from '@/services/api'
import { formatNumber } from '@/lib/utils'
import type { Disease } from '@/types'

export function DiseasesPage() {
  const [diseases, setDiseases] = useState<Disease[] | null>(null)

  useEffect(() => {
    getDiseases().then(setDiseases)
  }, [])

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron-600">
            <Activity className="h-4 w-4" aria-hidden /> Diseases &amp; Conditions
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Evidence by disease</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Start from a condition to see which AYUSH systems have studied it, how much research
            exists, and a plain-language summary of the evidence.
          </p>
        </Container>
      </div>

      <Container className="pt-8">
        {!diseases ? (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-52 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {diseases.map((d) => (
              <article
                key={d.id}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-navy">{d.name}</h2>
                    <Badge tone="outline" className="mt-1.5">
                      {d.category}
                    </Badge>
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(d.name)}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy hover:bg-navy-50"
                  >
                    <Search className="h-3.5 w-3.5" aria-hidden /> Evidence
                  </Link>
                </div>

                <p className="mt-3 text-sm text-slate-600">{d.description}</p>

                <p className="mt-3 rounded-lg bg-navy-50/60 px-3 py-2 text-xs text-slate-600">
                  <span className="font-semibold text-navy">Evidence summary:</span>{' '}
                  {d.evidenceSummary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.systemsStudied.map((s) => (
                    <Badge key={s} tone="navy">
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-4 text-sm">
                  <div className="flex gap-4">
                    <span>
                      <span className="font-semibold text-navy">
                        {formatNumber(d.researchCount)}
                      </span>{' '}
                      <span className="text-slate-500">studies</span>
                    </span>
                    <span>
                      <span className="font-semibold text-navy">{d.trialCount}</span>{' '}
                      <span className="text-slate-500">trials</span>
                    </span>
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(d.name)}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-saffron-600"
                  >
                    Explore <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
