import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'What does the AYUSH Evidence Portal do?',
    a: 'It lets you search peer-reviewed research and registered clinical trials across the five AYUSH systems, and shows how credible the evidence behind each result is using a transparent A–D grading scale.',
  },
  {
    q: 'How is the evidence level decided?',
    a: 'Each study is graded by study design, adapted from standard evidence-based-medicine hierarchies. Level A is a systematic review or meta-analysis, Level B a randomised controlled trial, Level C an observational study, and Level D preclinical, case-series or traditional evidence.',
  },
  {
    q: 'Is this medical advice?',
    a: 'No. The portal is a discovery and educational tool. It helps you find and understand research, but it is not a substitute for consultation with a registered medical or AYUSH practitioner.',
  },
  {
    q: 'Can I submit my own research or a patent?',
    a: 'Yes. Use the Upload section to submit studies, reviews or AYUSH-related patents. Editors verify the metadata and evidence grade before publishing.',
  },
  {
    q: 'Do you show negative or inconclusive results?',
    a: 'Yes, deliberately. Transparency means surfacing studies that found no effect alongside positive ones, so users get an honest picture of the evidence.',
  },
  {
    q: 'Is the portal free to use?',
    a: 'Yes. Searching and reading indexed research is free. Some source articles may be hosted on third-party sites with their own access terms; open-access studies are clearly labelled.',
  },
  {
    q: 'How current is the data?',
    a: 'The portal continuously ingests new research and CTRI-registered trials from partner institutions and public registries. Publication years are shown on every record.',
  },
]

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-12">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron-600">
            <HelpCircle className="h-4 w-4" aria-hidden /> Frequently asked questions
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">How the portal works</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Answers to common questions about evidence grading, submissions and how to use the
            portal responsibly.
          </p>
        </Container>
      </div>

      <Container className="pt-10">
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-navy">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-navy/50 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
