import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { EVIDENCE_META } from '@/lib/utils'
import type { EvidenceLevel } from '@/types'

const ORDER: EvidenceLevel[] = ['A', 'B', 'C', 'D']

/**
 * Explains the A–D evidence ladder. This is the conceptual anchor of the whole
 * portal: instead of a flat list of papers, every result is placed on a
 * credibility scale so users can judge trustworthiness instantly.
 */
export function EvidenceExplainer() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="How we grade evidence"
          title="Every result carries an evidence level"
          description="Not all research is equal. We place each study on a transparent A–D ladder, adapted from evidence-based-medicine standards, so you can weigh a claim in seconds."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((level, i) => {
            const meta = EVIDENCE_META[level]
            return (
              <div
                key={level}
                className="relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
              >
                {/* strength bar */}
                <div className="mb-4 flex items-end gap-1" aria-hidden>
                  {ORDER.map((_, barIdx) => (
                    <span
                      key={barIdx}
                      className={`w-full rounded-sm ${
                        barIdx <= ORDER.length - 1 - i ? meta.dot : 'bg-slate-200'
                      }`}
                      style={{ height: 6 + (barIdx <= ORDER.length - 1 - i ? 10 : 0) }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${meta.dot}`} aria-hidden />
                  <span className="font-mono text-sm font-semibold text-navy">Level {level}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold">{meta.label}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{meta.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
