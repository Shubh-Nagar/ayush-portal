import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, Upload, LogIn, LayoutDashboard } from 'lucide-react'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { SYSTEMS } from '@/data/systems'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/research', label: 'Research' },
  { to: '/diseases', label: 'Diseases' },
  { to: '/trials', label: 'Clinical Trials' },
  { to: '/collaborate', label: 'Collaborate' },
]

// Show Homoeopathy first in the Systems dropdown, keep the rest in source order.
const DROPDOWN_SYSTEMS = [...SYSTEMS].sort((a, b) =>
  a.id === 'homoeopathy' ? -1 : b.id === 'homoeopathy' ? 1 : 0
)

export function Navbar() {
  const [systemsOpen, setSystemsOpen] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const { toggleMobileNav } = useUiStore()

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'link-underline px-1 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-navy' : 'text-slate-600 hover:text-navy'
    )

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {/* Systems dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSystemsOpen(true)}
            onMouseLeave={() => setSystemsOpen(false)}
          >
            <button
              className="flex items-center gap-1 py-2 text-sm font-medium text-slate-600 hover:text-navy"
              aria-expanded={systemsOpen}
              aria-haspopup="true"
              onClick={() => setSystemsOpen((o) => !o)}
            >
              Systems
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            {systemsOpen && (
              <div className="absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 pt-2">
                <div className="overflow-hidden rounded-xl border border-navy-100 bg-white p-1.5 shadow-card-hover">
                  {DROPDOWN_SYSTEMS.map((s) => (
                    <Link
                      key={s.id}
                      to={`/system/${s.slug}`}
                      className="block rounded-lg px-3 py-2 hover:bg-navy-50"
                    >
                      <span className="block text-sm font-medium text-navy">{s.name}</span>
                      <span className="block text-xs text-slate-500">{s.tagline}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/upload"
            className="hidden items-center gap-1.5 rounded-lg border border-navy/15 px-3 py-2 text-sm font-medium text-navy hover:bg-navy-50 sm:inline-flex"
          >
            <Upload className="h-4 w-4" aria-hidden /> Upload
          </Link>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-sm font-medium text-white hover:bg-navy-600"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron text-xs font-semibold">
                {user?.avatarInitials}
              </span>
              <span className="hidden sm:inline">Dashboard</span>
              <LayoutDashboard className="h-4 w-4 sm:hidden" aria-hidden />
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-600"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          <button
            onClick={toggleMobileNav}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-navy-50 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <MobileNav />
    </header>
  )
}
