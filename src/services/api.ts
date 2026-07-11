// ---------------------------------------------------------------------------
// Mock API service.
// Every function simulates a network round-trip so the UI behaves exactly as it
// will against a real backend. Swap the bodies for `fetch(import.meta.env
// .VITE_API_BASE_URL + ...)` calls when the evidence API is ready — the return
// shapes are already the contract.
// ---------------------------------------------------------------------------
import { RESEARCH } from '@/data/research'
import { TRIALS } from '@/data/trials'
import { DISEASES } from '@/data/diseases'
import { SYSTEMS } from '@/data/systems'
import type {
  ClinicalTrial,
  ResearchArticle,
  SearchFilters,
  EvidenceLevel,
} from '@/types'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const EVIDENCE_RANK: Record<EvidenceLevel, number> = { A: 4, B: 3, C: 2, D: 1 }

export interface SearchResponse {
  query: string
  total: number
  articles: ResearchArticle[]
  trials: ClinicalTrial[]
  /** A short, plain-language answer to "is there credible evidence?" */
  verdict: {
    hasEvidence: boolean
    strongest: EvidenceLevel | null
    summary: string
  }
}

function matchText(haystack: string[], query: string): boolean {
  const q = query.toLowerCase().trim()
  if (!q) return true
  return haystack.some((h) => h.toLowerCase().includes(q))
}

/** Full-text-ish search across the research + trials corpus. */
export async function search(
  query: string,
  filters: Partial<SearchFilters> = {}
): Promise<SearchResponse> {
  await delay(450) // simulate latency

  const q = query.toLowerCase().trim()

  let articles = RESEARCH.filter((a) =>
    matchText(
      [a.title, a.abstract, ...a.herbs, ...a.conditions, ...a.tags, a.system],
      q
    )
  )
  let trials = TRIALS.filter((t) =>
    matchText([t.title, t.condition, t.intervention, t.system], q)
  )

  // ---- apply filters -----------------------------------------------------
  if (filters.systems?.length) {
    articles = articles.filter((a) => filters.systems!.includes(a.system))
    trials = trials.filter((t) => filters.systems!.includes(t.system))
  }
  if (filters.evidenceLevels?.length) {
    articles = articles.filter((a) =>
      filters.evidenceLevels!.includes(a.evidenceLevel)
    )
  }
  if (filters.yearFrom) articles = articles.filter((a) => a.year >= filters.yearFrom!)
  if (filters.yearTo) articles = articles.filter((a) => a.year <= filters.yearTo!)
  if (filters.openAccessOnly) articles = articles.filter((a) => a.openAccess)

  if (filters.contentType === 'research') trials = []
  if (filters.contentType === 'trials') articles = []

  // ---- sorting -----------------------------------------------------------
  switch (filters.sortBy) {
    case 'recent':
      articles = [...articles].sort((a, b) => b.year - a.year)
      break
    case 'citations':
      articles = [...articles].sort((a, b) => b.citations - a.citations)
      break
    case 'evidence':
      articles = [...articles].sort(
        (a, b) => EVIDENCE_RANK[b.evidenceLevel] - EVIDENCE_RANK[a.evidenceLevel]
      )
      break
    default: // relevance — keep natural order, evidence as a tiebreaker
      articles = [...articles].sort(
        (a, b) => EVIDENCE_RANK[b.evidenceLevel] - EVIDENCE_RANK[a.evidenceLevel]
      )
  }

  // ---- build the plain-language verdict ----------------------------------
  const levels = articles.map((a) => a.evidenceLevel)
  const strongest =
    (['A', 'B', 'C', 'D'] as EvidenceLevel[]).find((l) => levels.includes(l)) ??
    null
  const total = articles.length + trials.length

  let summary: string
  if (!q) {
    summary = 'Enter a herb, medicine, disease or treatment to check the evidence.'
  } else if (total === 0) {
    summary = `No indexed evidence found for “${query}”. Try a broader or alternative term.`
  } else if (strongest === 'A') {
    summary = `Credible evidence exists for “${query}”, including systematic-review level research.`
  } else if (strongest === 'B') {
    summary = `Randomised-trial evidence is available for “${query}”. Review the studies below.`
  } else {
    summary = `Some early-stage evidence exists for “${query}”. Interpret with caution.`
  }

  return {
    query,
    total,
    articles,
    trials,
    verdict: { hasEvidence: total > 0, strongest, summary },
  }
}

export async function getResearchById(id: string): Promise<ResearchArticle | null> {
  await delay(200)
  return RESEARCH.find((a) => a.id === id) ?? null
}

export async function getRelatedResearch(
  article: ResearchArticle,
  limit = 3
): Promise<ResearchArticle[]> {
  await delay(150)
  return RESEARCH.filter(
    (a) =>
      a.id !== article.id &&
      (a.system === article.system ||
        a.conditions.some((c) => article.conditions.includes(c)))
  ).slice(0, limit)
}

export async function getFeaturedResearch(limit = 6): Promise<ResearchArticle[]> {
  await delay(250)
  return [...RESEARCH]
    .sort((a, b) => EVIDENCE_RANK[b.evidenceLevel] - EVIDENCE_RANK[a.evidenceLevel])
    .slice(0, limit)
}

export async function getTrials(): Promise<ClinicalTrial[]> {
  await delay(250)
  return TRIALS
}

export async function getDiseases() {
  await delay(200)
  return DISEASES
}

export async function getSystems() {
  await delay(150)
  return SYSTEMS
}

/** Lightweight autosuggest for the search bar. */
export function getSuggestions(query: string, limit = 6): string[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const pool = new Set<string>()
  RESEARCH.forEach((a) => {
    a.herbs.forEach((h) => pool.add(h))
    a.conditions.forEach((c) => pool.add(c))
  })
  DISEASES.forEach((d) => pool.add(d.name))
  return [...pool]
    .filter((term) => term.toLowerCase().includes(q))
    .slice(0, limit)
}
