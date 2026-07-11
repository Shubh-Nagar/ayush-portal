import { Handshake, Building2, Globe2, FileCheck2, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'

const PARTNERS = [
  'All India Institute of Ayurveda (AIIA)',
  'Central Council for Research in Homoeopathy (CCRH)',
  'National Institute of Siddha (NIS)',
  'National Institute of Unani Medicine (NIUM)',
  'S-VYASA University',
  'IPGT&RA, Jamnagar',
  'National Institute of Naturopathy (NIN)',
  'Banaras Hindu University (BHU)',
]

const BENEFITS = [
  {
    icon: FileCheck2,
    title: 'Index your research',
    text: 'Publish your institution’s studies and trials to a national, evidence-graded audience.',
  },
  {
    icon: Globe2,
    title: 'Reach & visibility',
    text: 'Get discovered by researchers, clinicians and policymakers searching for credible evidence.',
  },
  {
    icon: Building2,
    title: 'Data-sharing agreements',
    text: 'Establish structured feeds from your CTRI registrations and institutional repositories.',
  },
]

export function CollaborationPage() {
  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-navy text-white">
        <Container className="py-14">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron">
              <Handshake className="h-4 w-4" aria-hidden /> Institutional Collaboration
            </div>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Partner with the AYUSH Evidence Portal
            </h1>
            <p className="mt-4 text-lg text-white/80">
              We work with research councils, universities and hospitals to build India’s most
              trusted, transparent evidence base for traditional medicine.
            </p>
            <Button variant="saffron" size="lg" className="mt-6">
              Request a partnership <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Container>
      </div>

      <Container className="pt-14">
        <SectionHeading
          eyebrow="Why partner"
          title="What collaboration offers"
          description="A structured way to contribute to, and benefit from, a national evidence commons."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50">
                <b.icon className="h-5 w-5 text-navy" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.text}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <SectionHeading eyebrow="Trusted network" title="Contributing institutions" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-4 text-sm font-medium text-navy shadow-sm"
              >
                <Building2 className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden />
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-saffron/30 bg-saffron-50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold">Ready to collaborate?</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Reach out to our partnerships team to discuss data-sharing, indexing and joint research
            initiatives.
          </p>
          <Button size="lg" className="mt-6">
            Contact partnerships team
          </Button>
        </section>
      </Container>
    </div>
  )
}
