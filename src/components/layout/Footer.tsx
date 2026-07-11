import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { SYSTEMS } from '@/data/systems'

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { to: '/research', label: 'Research Library' },
      { to: '/trials', label: 'Clinical Trials' },
      { to: '/diseases', label: 'Diseases' },
      { to: '/collaborate', label: 'Collaborate' },
    ],
  },
  {
    heading: 'Portal',
    links: [
      { to: '/about', label: 'About' },
      { to: '/upload', label: 'Upload research' },
      { to: '/faq', label: 'FAQs' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-navy/10 bg-navy text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm text-white/70">
              A Government of India research-discovery platform helping researchers, clinicians,
              students and the public find credible, evidence-graded research across the AYUSH
              systems of medicine.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-saffron" aria-hidden /> Ministry of AYUSH, New Delhi
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saffron" aria-hidden /> evidence@ayush.gov.in
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-saffron" aria-hidden /> 1800-XXX-AYUSH (toll-free)
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Systems</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SYSTEMS.map((s) => (
                <li key={s.id}>
                  <Link to={`/system/${s.slug}`} className="text-white/70 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ministry of AYUSH, Government of India. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/about" className="hover:text-white">Terms of use</Link>
            <Link to="/about" className="hover:text-white">Privacy policy</Link>
            <Link to="/about" className="hover:text-white">Accessibility</Link>
            <a href="#main" className="hover:text-white">Back to top</a>
          </div>
        </div>

        <p className="mt-6 rounded-lg bg-white/5 px-4 py-3 text-xs text-white/50">
          Disclaimer: This portal indexes and grades published research for discovery and educational
          purposes. It is not medical advice. Always consult a registered practitioner before making
          treatment decisions.
        </p>
      </div>
    </footer>
  )
}
