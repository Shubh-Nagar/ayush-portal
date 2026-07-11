import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { EvidenceLevel } from '@/types'

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Human-readable label for each evidence grade. */
export const EVIDENCE_META: Record<
  EvidenceLevel,
  { label: string; short: string; description: string; colorClass: string; dot: string }
> = {
  A: {
    label: 'Systematic Review / Meta-analysis',
    short: 'Strong evidence',
    description: 'Pooled analysis of multiple studies — the highest tier of evidence.',
    colorClass: 'bg-india-50 text-india-700 border-india-600/30',
    dot: 'bg-ev-a',
  },
  B: {
    label: 'Randomised Controlled Trial',
    short: 'Moderate–strong',
    description: 'Controlled human trial with randomised allocation.',
    colorClass: 'bg-navy-50 text-chakra border-chakra/30',
    dot: 'bg-ev-b',
  },
  C: {
    label: 'Observational Study',
    short: 'Moderate',
    description: 'Cohort, case-control or cross-sectional human study.',
    colorClass: 'bg-saffron-50 text-saffron-600 border-saffron-500/30',
    dot: 'bg-ev-c',
  },
  D: {
    label: 'Preclinical / Traditional',
    short: 'Emerging',
    description: 'Lab, animal, case-series or classical textual evidence.',
    colorClass: 'bg-slate-100 text-slate-600 border-slate-400/30',
    dot: 'bg-ev-d',
  },
}

/** Compact number formatting, e.g. 12500 -> "12.5k". */
export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n)
}

/** Deterministic slugify for building URLs. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
