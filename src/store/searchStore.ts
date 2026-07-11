import { create } from 'zustand'
import type { SearchFilters } from '@/types'

export const DEFAULT_FILTERS: SearchFilters = {
  systems: [],
  evidenceLevels: [],
  yearFrom: null,
  yearTo: null,
  openAccessOnly: false,
  contentType: 'all',
  sortBy: 'relevance',
}

interface SearchState {
  query: string
  filters: SearchFilters
  recentSearches: string[]
  setQuery: (q: string) => void
  setFilters: (f: Partial<SearchFilters>) => void
  resetFilters: () => void
  addRecentSearch: (q: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  filters: DEFAULT_FILTERS,
  recentSearches: [],
  setQuery: (query) => set({ query }),
  setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  addRecentSearch: (q) =>
    set((s) => {
      const trimmed = q.trim()
      if (!trimmed) return s
      const next = [trimmed, ...s.recentSearches.filter((r) => r !== trimmed)]
      return { recentSearches: next.slice(0, 6) }
    }),
}))
