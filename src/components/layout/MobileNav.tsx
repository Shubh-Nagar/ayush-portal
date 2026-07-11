import { Link } from 'react-router-dom'
import { X, Upload } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SYSTEMS } from '@/data/systems'
import { useUiStore } from '@/store/uiStore'

const LINKS = [
  { to: '/research', label: 'Research Library' },
  { to: '/diseases', label: 'Diseases' },
  { to: '/trials', label: 'Clinical Trials' },
  { to: '/collaborate', label: 'Collaborate' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

export function MobileNav() {
  const { mobileNavOpen, setMobileNav } = useUiStore()
  const close = () => setMobileNav(false)

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
            role="dialog"
            aria-label="Menu"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-lg font-semibold text-navy">Menu</span>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-navy-50"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-navy" aria-hidden />
              </button>
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Systems of medicine
            </p>
            <div className="mb-5 grid grid-cols-1 gap-1">
              {SYSTEMS.map((s) => (
                <Link
                  key={s.id}
                  to={`/system/${s.slug}`}
                  onClick={close}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy-50"
                >
                  {s.name}
                </Link>
              ))}
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Explore
            </p>
            <div className="grid grid-cols-1 gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={close}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-navy-50"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              to="/upload"
              onClick={close}
              className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Upload className="h-4 w-4" aria-hidden /> Upload research or patent
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
