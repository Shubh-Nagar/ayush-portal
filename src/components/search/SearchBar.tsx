import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, CornerDownLeft } from 'lucide-react'
import { getSuggestions } from '@/services/api'
import { useSearchStore } from '@/store/searchStore'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  size?: 'md' | 'lg'
  autoFocus?: boolean
  className?: string
  /** Called on submit; if omitted the bar navigates to /search. */
  onSubmit?: (q: string) => void
}

const EXAMPLE_QUERIES = ['Ashwagandha for anxiety', 'Yoga for hypertension', 'Curcumin osteoarthritis']

export function SearchBar({ size = 'lg', autoFocus, className, onSubmit }: SearchBarProps) {
  const navigate = useNavigate()
  const { query, setQuery, addRecentSearch } = useSearchStore()
  const [local, setLocal] = useState(query)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSuggestions(getSuggestions(local))
    setActive(-1)
  }, [local])

  // Close the suggestion panel on outside click.
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function submit(value: string) {
    const q = value.trim()
    if (!q) return
    setQuery(q)
    addRecentSearch(q)
    setOpen(false)
    if (onSubmit) onSubmit(q)
    else navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) {
      if (e.key === 'Enter') submit(local)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      submit(active >= 0 ? suggestions[active] : local)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-navy/15 bg-white shadow-card',
          'focus-within:border-chakra/40 focus-within:shadow-card-hover transition-shadow',
          size === 'lg' ? 'px-4 py-2.5' : 'px-3 py-2'
        )}
      >
        <Search className="h-5 w-5 shrink-0 text-navy/50" aria-hidden />
        <label htmlFor="portal-search" className="sr-only">
          Search AYUSH research, herbs, treatments, diseases or clinical trials
        </label>
        <input
          id="portal-search"
          type="search"
          value={local}
          autoFocus={autoFocus}
          onChange={(e) => {
            setLocal(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search a herb, medicine, disease or treatment…"
          className={cn(
            'w-full border-0 bg-transparent text-navy placeholder:text-navy/40 focus:outline-none',
            size === 'lg' ? 'text-base sm:text-lg' : 'text-sm'
          )}
          role="combobox"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
        />
        <button
          onClick={() => submit(local)}
          className={cn(
            'shrink-0 rounded-xl bg-navy font-medium text-white transition-colors hover:bg-navy-600',
            size === 'lg' ? 'px-5 py-2.5 text-sm' : 'px-3 py-1.5 text-sm'
          )}
        >
          <span className="hidden sm:inline">Search evidence</span>
          <Search className="h-4 w-4 sm:hidden" aria-hidden />
        </button>
      </div>

      {/* Semantic-search hint */}
      {size === 'lg' && !open && (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-saffron-500" aria-hidden />
          Semantic search understands plain questions — try{' '}
          <button
            onClick={() => submit(EXAMPLE_QUERIES[0])}
            className="font-medium text-navy underline underline-offset-2"
          >
            “{EXAMPLE_QUERIES[0]}”
          </button>
        </p>
      )}

      {/* Suggestion dropdown */}
      {open && (local.trim() ? suggestions.length > 0 : true) && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-navy-100 bg-white py-1 shadow-card-hover"
        >
          {local.trim() === '' ? (
            <li className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Try searching
            </li>
          ) : null}
          {(local.trim() === '' ? EXAMPLE_QUERIES : suggestions).map((s, i) => (
            <li key={s} role="option" aria-selected={active === i}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => submit(s)}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2 text-left text-sm',
                  active === i ? 'bg-navy-50 text-navy' : 'text-slate-700'
                )}
              >
                <Search className="h-3.5 w-3.5 text-navy/40" aria-hidden />
                <span className="flex-1">{s}</span>
                {active === i && (
                  <CornerDownLeft className="h-3.5 w-3.5 text-navy/40" aria-hidden />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
