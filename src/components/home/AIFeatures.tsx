import { Sparkles, FileText, Wand2, Network } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'

const FEATURES = [
  {
    icon: Wand2,
    title: 'Semantic search',
    description:
      'Ask a plain-language question and the portal retrieves conceptually relevant research — not just keyword matches.',
    status: 'Live',
  },
  {
    icon: FileText,
    title: 'AI study summaries',
    description:
      'Get a neutral, plain-English summary of any paper — methods, findings and limitations — in seconds.',
    status: 'Preview',
  },
  {
    icon: Network,
    title: 'Smart recommendations',
    description:
      'See related studies, trials and reviews on the same herb, condition or intervention as you browse.',
    status: 'Preview',
  },
]

export function AIFeatures() {
  return (
    <section className="bg-navy py-16 text-white">
      <Container>
        <SectionHeading
          eyebrow="Research intelligence"
          title="AI that helps you find, not decide"
          description="Discovery tools that surface the right evidence faster — while always keeping the human researcher in control."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-saffron/20">
                  <f.icon className="h-5 w-5 text-saffron" aria-hidden />
                </span>
                <Badge tone={f.status === 'Live' ? 'green' : 'saffron'}>{f.status}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-white/50">
          <Sparkles className="h-4 w-4 text-saffron" aria-hidden />
          AI summaries are assistive and may contain errors — always verify against the source study.
        </p>
      </Container>
    </section>
  )
}
