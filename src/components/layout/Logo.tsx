import { Link } from 'react-router-dom'

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="AYUSH Evidence Portal — home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-navy shadow-sm">
        {/* leaf + chakra mark echoing the favicon */}
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
          <path
            d="M20 8c-4.4 5-6.9 8.8-6.9 13.1a6.9 6.9 0 0 0 13.8 0C26.9 16.8 24.4 13 20 8Z"
            fill="#0F7B3E"
          />
          <circle cx="20" cy="21" r="5.4" fill="none" stroke="#E8791B" strokeWidth="1.6" />
          <g stroke="#E8791B" strokeWidth="1">
            <path d="M20 15.6v10.8M14.6 21h10.8M16.2 17.2l7.6 7.6M23.8 17.2l-7.6 7.6" />
          </g>
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block font-serif text-lg font-semibold ${
            inverted ? 'text-white' : 'text-navy'
          }`}
        >
          AYUSH Evidence
        </span>
        <span
          className={`block text-[11px] font-medium uppercase tracking-wider ${
            inverted ? 'text-white/70' : 'text-slate-500'
          }`}
        >
          Research Portal · India
        </span>
      </span>
    </Link>
  )
}
