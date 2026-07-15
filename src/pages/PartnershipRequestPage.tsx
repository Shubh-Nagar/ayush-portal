import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Handshake,
  Users,
  FileText,
  Building2,
  FolderGit2,
  Network,
  Send,
  CheckCircle2,
  ArrowLeft,
  Check,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

const OPTIONS = [
  {
    id: 'research-collaborators',
    icon: Users,
    title: 'Search for research collaborators',
    text: 'Find researchers and clinicians working in your field to team up with on new studies.',
  },
  {
    id: 'paper-publication',
    icon: FileText,
    title: 'Paper publication collaboration',
    text: 'Co-author and co-publish papers, reviews and evidence syntheses with other contributors.',
  },
  {
    id: 'institutional-partnership',
    icon: Building2,
    title: 'Institutional research partnerships',
    text: 'Set up data-sharing and joint programmes between universities, councils and hospitals.',
  },
  {
    id: 'project-collaboration',
    icon: FolderGit2,
    title: 'Project collaborations',
    text: 'Join or propose specific research projects, trials or grant-funded initiatives.',
  },
  {
    id: 'academic-networking',
    icon: Network,
    title: 'Academic networking opportunities',
    text: 'Connect with the wider AYUSH research community through events and working groups.',
  },
] as const

export function PartnershipRequestPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-navy text-white">
        <Container className="py-14">
          <div className="max-w-2xl">
            <Link
              to="/collaborate"
              className="mb-5 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to collaboration
            </Link>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-saffron">
              <Handshake className="h-4 w-4" aria-hidden /> Request a partnership
            </div>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              How would you like to collaborate?
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Choose one or more collaboration options below and share a few details. The
              partnerships team will get back to you to take things forward.
            </p>
          </div>
        </Container>
      </div>

      <Container className="pt-12">
        {sent ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-card sm:p-12">
            <CheckCircle2 className="mx-auto h-12 w-12 text-india" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold">Request received</h2>
            <p className="mt-2 text-slate-600">
              Thanks for your interest in collaborating. We typically respond within two working
              days.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSent(false)
                  setSelected([])
                }}
              >
                Submit another request
              </Button>
              <Link
                to="/collaborate"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-navy px-5 text-sm font-medium text-white hover:bg-navy-600"
              >
                Back to collaboration
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="grid gap-8 lg:grid-cols-[1fr_360px]"
          >
            <fieldset>
              <legend className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Collaboration options
              </legend>
              <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {OPTIONS.map((opt) => {
                  const isSelected = selected.includes(opt.id)
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => toggle(opt.id)}
                      aria-pressed={isSelected}
                      className={[
                        'group relative flex flex-col rounded-2xl border p-5 text-left shadow-sm transition-colors',
                        isSelected
                          ? 'border-saffron bg-saffron-50'
                          : 'border-navy/10 bg-white hover:border-navy/25',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border',
                          isSelected
                            ? 'border-saffron bg-saffron text-white'
                            : 'border-navy/20 text-transparent',
                        ].join(' ')}
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50">
                        <opt.icon className="h-5 w-5 text-navy" aria-hidden />
                      </span>
                      <h3 className="mt-4 pr-6 text-base font-semibold text-navy">{opt.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-600">{opt.text}</p>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <aside className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Your details
              </h2>
              <div className="mt-5 space-y-5">
                <div>
                  <label htmlFor="p-name" className="mb-1.5 block text-sm font-medium text-navy">
                    Name
                  </label>
                  <input id="p-name" type="text" required className={ci} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="p-email" className="mb-1.5 block text-sm font-medium text-navy">
                    Email
                  </label>
                  <input
                    id="p-email"
                    type="email"
                    required
                    className={ci}
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="p-org" className="mb-1.5 block text-sm font-medium text-navy">
                    Institution / organisation
                  </label>
                  <input
                    id="p-org"
                    type="text"
                    className={ci}
                    placeholder="University, council or hospital"
                  />
                </div>
                <div>
                  <label htmlFor="p-msg" className="mb-1.5 block text-sm font-medium text-navy">
                    Tell us more
                  </label>
                  <textarea
                    id="p-msg"
                    rows={4}
                    className={ci}
                    placeholder="Briefly describe what you're looking to collaborate on."
                  />
                </div>
                {selected.length > 0 && (
                  <p className="text-xs text-slate-500">
                    {selected.length} option{selected.length > 1 ? 's' : ''} selected.
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" aria-hidden /> Submit request
                </Button>
              </div>
            </aside>
          </form>
        )}
      </Container>
    </div>
  )
}

const ci =
  'w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm focus:border-chakra focus:outline-none focus:ring-2 focus:ring-chakra/30'
