import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { SYSTEMS } from '@/data/systems'
import { EVIDENCE_META } from '@/lib/utils'
import { useSearchStore } from '@/store/searchStore'
import type { AyushSystem, EvidenceLevel, SearchFilters } from '@/types'

const EVIDENCE_LEVELS: EvidenceLevel[] = ['A', 'B', 'C', 'D']
const SORT_OPTIONS: { value: SearchFilters['sortBy']; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'evidence', label: 'Evidence strength' },
  { value: 'recent', label: 'Most recent' },
  { value: 'citations', label: 'Most cited' },
]

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function SearchFiltersPanel() {
  const { filters, setFilters, resetFilters } = useSearchStore()

  return (
    <aside
      aria-label="Search filters"
      className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-navy">
          <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
        </h2>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-navy"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset
        </button>
      </div>

      {/* Content type */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Show
        </legend>
        <div className="flex rounded-lg border border-navy/10 p-0.5 text-sm">
          {(['all', 'research', 'trials'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ contentType: t })}
              className={`flex-1 rounded-md px-2 py-1.5 capitalize transition-colors ${
                filters.contentType === t
                  ? 'bg-navy text-white'
                  : 'text-slate-600 hover:bg-navy-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Evidence level */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Evidence level
        </legend>
        <div className="space-y-1.5">
          {EVIDENCE_LEVELS.map((lvl) => (
            <label
              key={lvl}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm hover:bg-navy-50"
            >
              <input
                type="checkbox"
                checked={filters.evidenceLevels.includes(lvl)}
                onChange={() =>
                  setFilters({ evidenceLevels: toggle(filters.evidenceLevels, lvl) })
                }
                className="h-4 w-4 rounded border-navy/30 text-chakra focus:ring-chakra"
              />
              <span className={`h-2.5 w-2.5 rounded-full ${EVIDENCE_META[lvl].dot}`} aria-hidden />
              <span className="text-slate-700">
                <span className="font-mono font-semibold">Level {lvl}</span>{' '}
                <span className="text-slate-500">· {EVIDENCE_META[lvl].short}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* AYUSH system */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          System of medicine
        </legend>
        <div className="space-y-1">
          {SYSTEMS.map((s) => (
            <label
              key={s.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm hover:bg-navy-50"
            >
              <input
                type="checkbox"
                checked={filters.systems.includes(s.name as AyushSystem)}
                onChange={() => setFilters({ systems: toggle(filters.systems, s.name) })}
                className="h-4 w-4 rounded border-navy/30 text-chakra focus:ring-chakra"
              />
              <span className="text-slate-700">{s.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Year range */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Publication year
        </legend>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="From"
            min={2000}
            max={2026}
            value={filters.yearFrom ?? ''}
            onChange={(e) =>
              setFilters({ yearFrom: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full rounded-lg border border-navy/15 px-2 py-1.5 text-sm focus:border-chakra focus:outline-none"
            aria-label="Year from"
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            placeholder="To"
            min={2000}
            max={2026}
            value={filters.yearTo ?? ''}
            onChange={(e) =>
              setFilters({ yearTo: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full rounded-lg border border-navy/15 px-2 py-1.5 text-sm focus:border-chakra focus:outline-none"
            aria-label="Year to"
          />
        </div>
      </fieldset>

      {/* Open access + sort */}
      <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={filters.openAccessOnly}
          onChange={(e) => setFilters({ openAccessOnly: e.target.checked })}
          className="h-4 w-4 rounded border-navy/30 text-chakra focus:ring-chakra"
        />
        <span className="text-slate-700">Open access only</span>
      </label>

      <div>
        <label
          htmlFor="sort-by"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400"
        >
          Sort by
        </label>
        <select
          id="sort-by"
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value as SearchFilters['sortBy'] })}
          className="w-full rounded-lg border border-navy/15 px-2 py-2 text-sm focus:border-chakra focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
