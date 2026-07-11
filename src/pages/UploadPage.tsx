import { useState } from 'react'
import { UploadCloud, FileText, CheckCircle2, Info } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { SYSTEMS } from '@/data/systems'
import type { EvidenceLevel } from '@/types'
import { EVIDENCE_META } from '@/lib/utils'

const EVIDENCE_LEVELS: EvidenceLevel[] = ['A', 'B', 'C', 'D']

export function UploadPage() {
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState<'article' | 'patent'>('article')

  if (submitted) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-india-100 bg-india-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-india" aria-hidden />
          <h1 className="mt-4 text-2xl font-semibold">Submission received</h1>
          <p className="mt-2 text-slate-600">
            Thank you. Your {type} has been submitted for editorial review. Our team verifies
            evidence grading and metadata before publishing to the portal.
          </p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>
            Submit another
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron-600">
            <UploadCloud className="h-4 w-4" aria-hidden /> Contribute
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Upload research or patents</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Share peer-reviewed studies, reviews, or AYUSH-related patents with the community. All
            submissions are reviewed and evidence-graded before publication.
          </p>
        </Container>
      </div>

      <Container className="pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card"
          >
            {/* Type toggle */}
            <div className="mb-6 flex rounded-lg border border-navy/10 p-1">
              {(['article', 'patent'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
                    type === t ? 'bg-navy text-white' : 'text-slate-600 hover:bg-navy-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-5">
              <Field label="Title" required>
                <input type="text" required className={inputClass} placeholder={`${type === 'article' ? 'Study' : 'Patent'} title`} />
              </Field>

              <Field label="Authors / inventors" required>
                <input type="text" required className={inputClass} placeholder="Comma-separated names" />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="System of medicine" required>
                  <select required className={inputClass} defaultValue="">
                    <option value="" disabled>Select a system</option>
                    {SYSTEMS.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Year" required>
                  <input type="number" required min={1990} max={2026} className={inputClass} placeholder="2024" />
                </Field>
              </div>

              {type === 'article' && (
                <Field label="Study type / evidence level" hint="Our editors verify this grading.">
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>Select suggested level</option>
                    {EVIDENCE_LEVELS.map((l) => (
                      <option key={l} value={l}>
                        Level {l} — {EVIDENCE_META[l].label}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label={type === 'article' ? 'Abstract' : 'Description'} required>
                <textarea required rows={4} className={inputClass} placeholder="Brief summary…" />
              </Field>

              <Field label="Herbs / interventions" hint="Comma-separated, optional.">
                <input type="text" className={inputClass} placeholder="e.g. Ashwagandha, Turmeric" />
              </Field>

              <Field label={type === 'article' ? 'DOI or source URL' : 'Patent number'}>
                <input type="text" className={inputClass} placeholder={type === 'article' ? '10.xxxx/xxxxx' : 'IN-XXXXXXX'} />
              </Field>

              {/* File dropzone (visual only) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">Attach PDF</label>
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy/15 bg-navy-50/40 px-6 py-8 text-center">
                  <FileText className="h-8 w-8 text-navy/40" aria-hidden />
                  <p className="mt-2 text-sm text-slate-600">
                    Drag &amp; drop or <span className="font-medium text-navy">browse</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">PDF up to 20&nbsp;MB</p>
                  <input type="file" accept="application/pdf" className="mt-3 text-xs" />
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-sm text-slate-600">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-navy/30 text-chakra focus:ring-chakra" />
                <span>
                  I confirm I have the right to share this material and that the information provided
                  is accurate.
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <UploadCloud className="h-4 w-4" aria-hidden /> Submit for review
              </Button>
            </div>
          </form>

          {/* Guidance sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Info className="h-4 w-4 text-saffron-600" aria-hidden /> Review process
              </h2>
              <ol className="mt-3 space-y-3 text-sm text-slate-600">
                {[
                  'Submit your study or patent with metadata.',
                  'Editors verify evidence grade & authenticity.',
                  'Published and made discoverable on the portal.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-saffron/30 bg-saffron-50/60 p-5 text-sm text-slate-600">
              Typical review time is 3–5 working days. You'll be notified by email once a decision is
              made.
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:border-chakra focus:outline-none focus:ring-2 focus:ring-chakra/30'

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  hint?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-saffron-600">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
