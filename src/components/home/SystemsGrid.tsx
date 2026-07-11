import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SYSTEMS } from '@/data/systems'
import { formatCompact } from '@/lib/utils'

export function SystemsGrid() {
  return (
    <section className="bg-white/60 py-16">
      <Container>
        <SectionHeading
          eyebrow="Five systems, one evidence base"
          title="Browse by system of medicine"
          description="Each AYUSH system has its own research traditions and strengths. Explore the evidence within each."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((s) => (
            <Link
              key={s.id}
              to={`/system/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-navy">{s.name}</h3>
                <ArrowRight className="h-5 w-5 text-navy/30 transition-all group-hover:translate-x-1 group-hover:text-saffron" aria-hidden />
              </div>
              <p className="text-sm font-medium text-saffron-600">{s.tagline}</p>
              <p className="mt-2 flex-1 text-sm text-slate-600">{s.description}</p>
              <div className="mt-4 flex gap-4 border-t border-navy/5 pt-4 text-sm">
                <span>
                  <span className="font-semibold text-navy">{formatCompact(s.researchCount)}</span>{' '}
                  <span className="text-slate-500">articles</span>
                </span>
                <span>
                  <span className="font-semibold text-navy">{formatCompact(s.trialCount)}</span>{' '}
                  <span className="text-slate-500">trials</span>
                </span>
              </div>
            </Link>
          ))}

          {/* CTA card */}
          <Link
            to="/research"
            className="flex flex-col items-start justify-center rounded-2xl border border-dashed border-saffron/40 bg-saffron-50 p-6 transition-colors hover:bg-saffron-100"
          >
            <h3 className="text-xl font-semibold text-saffron-600">All research</h3>
            <p className="mt-2 text-sm text-slate-600">
              Search the full evidence library across every system with advanced filters.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-saffron-600">
              Open library <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
