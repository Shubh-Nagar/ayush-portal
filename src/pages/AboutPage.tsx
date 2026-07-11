import { Target, Eye, ScrollText } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { PORTAL_STATS } from '@/data/systems'
import { formatCompact } from '@/lib/utils'

export function AboutPage() {
  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-14">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-saffron-600">
              About the portal
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Making AYUSH research transparent, discoverable and trustworthy
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              The AYUSH Evidence Portal is a Government of India initiative to help anyone — from
              researchers to the public — quickly find credible, evidence-graded research across the
              five AYUSH systems of medicine.
            </p>
          </div>
        </Container>
      </div>

      <Container className="pt-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: 'Our mission', text: 'To answer one question well: is there credible evidence for this herb, medicine or treatment? Clearly, honestly and at scale.' },
            { icon: Eye, title: 'Our approach', text: 'Every study is placed on a transparent A–D evidence ladder. We surface strong and weak — and even negative — findings alike.' },
            { icon: ScrollText, title: 'Our commitment', text: 'Discovery, not diagnosis. We help people find and understand research; we never replace a registered practitioner.' },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50">
                <c.icon className="h-5 w-5 text-navy" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 rounded-2xl bg-navy p-8 text-white sm:p-12">
          <SectionHeading
            eyebrow="Portal at a glance"
            title="A growing national evidence base"
            className="[&_h2]:text-white [&_p]:text-white/70"
          />
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {PORTAL_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-white">
                  {formatCompact(s.value)}
                  {s.suffix}
                </p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <SectionHeading eyebrow="How it works" title="From publication to portal" />
          <ol className="mt-6 space-y-5">
            {[
              ['Ingest', 'Research and CTRI-registered trials are collected from partner institutions and public registries.'],
              ['Grade', 'Each study is classified on the A–D evidence ladder and tagged by system, herb and condition.'],
              ['Discover', 'Users search in plain language and get a clear verdict, graded results and related evidence.'],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-saffron text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </div>
  )
}
