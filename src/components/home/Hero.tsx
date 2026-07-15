import { motion } from 'framer-motion'
import { ShieldCheck, BookOpenCheck, FlaskConical } from 'lucide-react'
import { SearchBar } from '@/components/search/SearchBar'
import { Container } from '@/components/common/Container'

const POPULAR = ['Ashwagandha', 'Yoga for hypertension', 'Turmeric', 'Insomnia', 'Guduchi immunity']

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft background texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(232,121,27,0.06) 0%, transparent 60%), radial-gradient(50% 40% at 80% 10%, rgba(15,123,62,0.05) 0%, transparent 60%)',
        }}
      />
      <Container className="pb-14 pt-16 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 text-xs font-medium text-navy shadow-sm">
            <ShieldCheck className="h-4 w-4 text-india" aria-hidden />
            Evidence-graded AYUSH research
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            Is there credible evidence
            <br className="hidden sm:block" /> behind this{' '}
            <span className="text-saffron-600">AYUSH</span> remedy?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Search peer-reviewed research and clinical trials across Ayurveda, Yoga &amp; Naturopathy,
            Unani, Siddha and Homoeopathy — each result graded by how strong the evidence really is.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-9 max-w-2xl"
        >
          <SearchBar size="lg" />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">Popular:</span>
            {POPULAR.map((term) => (
              <a
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-navy/10 bg-white px-3 py-1 text-navy transition-colors hover:border-navy/25 hover:bg-navy-50"
              >
                {term}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            { icon: BookOpenCheck, label: '42,000+ articles', sub: 'Indexed & graded' },
            { icon: FlaskConical, label: '3,200+ trials', sub: 'CTRI-registered' },
            { icon: ShieldCheck, label: 'A–D grading', sub: 'Evidence at a glance' },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white/70 px-4 py-3"
            >
              <f.icon className="h-5 w-5 shrink-0 text-navy" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-navy">{f.label}</p>
                <p className="text-xs text-slate-500">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
