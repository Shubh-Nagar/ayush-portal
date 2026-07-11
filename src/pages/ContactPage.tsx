import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="bg-paper pb-16">
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-12">
          <h1 className="text-3xl font-semibold sm:text-4xl">Contact us</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Questions about the portal, a submission, or a partnership? Send us a message and the
            relevant team will respond.
          </p>
        </Container>
      </div>

      <Container className="pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-india" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold">Message sent</h2>
                <p className="mt-2 text-slate-600">
                  Thanks for reaching out. We typically respond within two working days.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-navy">
                      Name
                    </label>
                    <input id="c-name" type="text" required className={ci} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-navy">
                      Email
                    </label>
                    <input id="c-email" type="email" required className={ci} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subj" className="mb-1.5 block text-sm font-medium text-navy">
                    Subject
                  </label>
                  <select id="c-subj" className={ci} defaultValue="">
                    <option value="" disabled>Select a topic</option>
                    <option>General enquiry</option>
                    <option>Research submission</option>
                    <option>Institutional partnership</option>
                    <option>Report an issue</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium text-navy">
                    Message
                  </label>
                  <textarea id="c-msg" required rows={5} className={ci} placeholder="How can we help?" />
                </div>
                <Button type="submit" size="lg">
                  <Send className="h-4 w-4" aria-hidden /> Send message
                </Button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Reach us
              </h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden />
                  <span className="text-slate-600">
                    Ministry of AYUSH, Ayush Bhawan, B-Block, GPO Complex, INA, New Delhi 110023
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden />
                  <span className="text-slate-600">evidence@ayush.gov.in</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden />
                  <span className="text-slate-600">1800-XXX-AYUSH (toll-free)</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-navy-50/60 p-6 text-sm text-slate-600">
              For medical emergencies, please contact your nearest hospital or call emergency
              services. This portal does not provide medical advice.
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

const ci =
  'w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm focus:border-chakra focus:outline-none focus:ring-2 focus:ring-chakra/30'
