import { Link } from 'react-router-dom'
import { Quote, Users, Calendar, Unlock, ArrowUpRight } from 'lucide-react'
import { EvidenceBadge } from '@/components/common/EvidenceBadge'
import { Badge } from '@/components/common/Badge'
import { formatNumber } from '@/lib/utils'
import type { ResearchArticle, StudyOutcome } from '@/types'

const OUTCOME_TONE: Record<StudyOutcome, { label: string; tone: 'green' | 'saffron' | 'neutral' }> = {
  positive: { label: 'Positive finding', tone: 'green' },
  mixed: { label: 'Mixed finding', tone: 'saffron' },
  inconclusive: { label: 'Inconclusive', tone: 'neutral' },
  negative: { label: 'Negative finding', tone: 'neutral' },
}

export function ResearchCard({ article }: { article: ResearchArticle }) {
  const outcome = OUTCOME_TONE[article.outcome]

  return (
    <article className="group rounded-2xl border border-navy/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <EvidenceBadge level={article.evidenceLevel} size="sm" />
        <Badge tone="navy">{article.system}</Badge>
        <Badge tone={outcome.tone}>{outcome.label}</Badge>
        {article.openAccess && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-india-700">
            <Unlock className="h-3.5 w-3.5" aria-hidden /> Open access
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold leading-snug">
        <Link
          to={`/research/${article.id}`}
          className="text-navy transition-colors hover:text-chakra"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{article.abstract}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="font-medium text-slate-700">
          {article.authors.slice(0, 2).join(', ')}
          {article.authors.length > 2 && ' et al.'}
        </span>
        <span className="italic">{article.journal}</span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" aria-hidden /> {article.year}
        </span>
        <span className="inline-flex items-center gap-1">
          <Quote className="h-3.5 w-3.5" aria-hidden /> {formatNumber(article.citations)} citations
        </span>
        {article.sampleSize && (
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden /> n = {formatNumber(article.sampleSize)}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {article.herbs.slice(0, 3).map((h) => (
            <span key={h} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {h}
            </span>
          ))}
        </div>
        <Link
          to={`/research/${article.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-navy opacity-0 transition-opacity group-hover:opacity-100"
        >
          Read <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
