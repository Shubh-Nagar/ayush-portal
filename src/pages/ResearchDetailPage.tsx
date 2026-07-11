import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Quote,
  Users,
  Calendar,
  Building2,
  Unlock,
  Download,
  Bookmark,
  Share2,
  Sparkles,
  FileText,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { EvidenceBadge } from '@/components/common/EvidenceBadge'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { ResearchCard } from '@/components/search/ResearchCard'
import { Skeleton } from '@/components/common/Skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { getResearchById, getRelatedResearch } from '@/services/api'
import { formatNumber } from '@/lib/utils'
import type { ResearchArticle } from '@/types'

export function ResearchDetailPage() {
  const { id } = useParams()
  const [article, setArticle] = useState<ResearchArticle | null>(null)
  const [related, setRelated] = useState<ResearchArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [summarising, setSummarising] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getResearchById(id).then((a) => {
      setArticle(a)
      setLoading(false)
      if (a) getRelatedResearch(a).then(setRelated)
    })
  }, [id])

  /** Simulated AI summarisation (placeholder for a real LLM call). */
  function generateSummary() {
    if (!article) return
    setSummarising(true)
    setSummary(null)
    setTimeout(() => {
      setSummary(
        `This ${article.studyType.toLowerCase()} examined ${article.herbs.join(', ') || article.system} ` +
          `for ${article.conditions.join(' and ')}. ` +
          `Reported outcome: ${article.outcome}. ` +
          `Graded Level ${article.evidenceLevel}, it ${
            article.evidenceLevel === 'A' || article.evidenceLevel === 'B'
              ? 'offers relatively strong evidence, though readers should still review methods and applicability.'
              : 'provides preliminary signals that require confirmation in larger, controlled studies.'
          }`
      )
      setSummarising(false)
    }, 1200)
  }

  if (loading) {
    return (
      <Container className="py-12">
        <Skeleton className="mb-4 h-5 w-40" />
        <Skeleton className="mb-3 h-9 w-3/4" />
        <Skeleton className="h-40 w-full" />
      </Container>
    )
  }

  if (!article) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Article not found"
          message="This research record may have been moved or is unavailable."
          icon={FileText}
        />
      </Container>
    )
  }

  return (
    <div className="bg-paper pb-16">
      <Container className="pt-8">
        <Link
          to="/research"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to library
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <article>
            <div className="flex flex-wrap items-center gap-2">
              <EvidenceBadge level={article.evidenceLevel} />
              <Badge tone="navy">{article.system}</Badge>
              <Badge tone="outline">{article.studyType}</Badge>
              {article.openAccess && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-india-700">
                  <Unlock className="h-3.5 w-3.5" aria-hidden /> Open access
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              {article.title}
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              {article.authors.join(', ')} · <span className="italic">{article.journal}</span> ·{' '}
              {article.year}
            </p>

            {/* AI summary card */}
            <div className="mt-6 rounded-2xl border border-saffron/30 bg-saffron-50/60 p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <Sparkles className="h-4 w-4 text-saffron-600" aria-hidden /> AI plain-language summary
                </h2>
                <Badge tone="saffron">Preview</Badge>
              </div>
              {summary ? (
                <p className="mt-3 text-sm text-slate-700">{summary}</p>
              ) : summarising ? (
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-slate-600">
                    Generate a neutral summary of methods, findings and limitations.
                  </p>
                  <Button size="sm" variant="saffron" className="mt-3" onClick={generateSummary}>
                    <Sparkles className="h-4 w-4" aria-hidden /> Summarise this study
                  </Button>
                </div>
              )}
            </div>

            {/* Abstract */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Abstract</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{article.abstract}</p>
            </section>

            {/* Herbs & conditions */}
            <section className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Herbs / interventions
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {article.herbs.length ? (
                    article.herbs.map((h) => (
                      <Link
                        key={h}
                        to={`/search?q=${encodeURIComponent(h)}`}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-navy-50"
                      >
                        {h}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">Non-pharmacological</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Conditions studied
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {article.conditions.map((c) => (
                    <Link
                      key={c}
                      to={`/search?q=${encodeURIComponent(c)}`}
                      className="rounded-md bg-navy-50 px-2.5 py-1 text-xs text-navy hover:bg-navy-100"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Study details
              </h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Quote className="h-4 w-4 text-navy/50" aria-hidden />
                  <span>{formatNumber(article.citations)} citations</span>
                </div>
                {article.sampleSize && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4 text-navy/50" aria-hidden />
                    <span>Sample size: {formatNumber(article.sampleSize)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4 text-navy/50" aria-hidden />
                  <span>Published {article.year}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="h-4 w-4 text-navy/50" aria-hidden />
                  <span>{article.institution}</span>
                </div>
              </dl>
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-500">
                DOI: {article.doi}
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <div className="grid grid-cols-1 gap-2">
                <Button variant="primary" size="sm">
                  <Download className="h-4 w-4" aria-hidden /> Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4" aria-hidden /> Save to library
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" aria-hidden /> Share / cite
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-lg font-semibold">Related research</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <ResearchCard key={r.id} article={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  )
}
