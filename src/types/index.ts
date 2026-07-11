// ---------------------------------------------------------------------------
// Core domain types for the AYUSH Evidence Portal.
// The "evidence level" grading is the heart of the product: it lets users
// instantly judge how credible the research behind a claim is.
// ---------------------------------------------------------------------------

/** The five recognised AYUSH systems of medicine. */
export type AyushSystem =
  | 'Ayurveda'
  | 'Yoga & Naturopathy'
  | 'Unani'
  | 'Siddha'
  | 'Homoeopathy'

/**
 * Evidence grade, adapted from standard evidence-based-medicine hierarchies.
 *  A – Systematic review / meta-analysis (strongest)
 *  B – Randomised controlled trial
 *  C – Observational / cohort / case-control
 *  D – Preclinical, case series or classical/traditional reference (weakest)
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D'

/** Direction of a study's reported finding. */
export type StudyOutcome = 'positive' | 'mixed' | 'inconclusive' | 'negative'

export type PublicationStatus = 'Peer-reviewed' | 'Preprint' | 'Government report'

export interface ResearchArticle {
  id: string
  title: string
  abstract: string
  authors: string[]
  system: AyushSystem
  evidenceLevel: EvidenceLevel
  studyType: string
  herbs: string[]
  conditions: string[]
  journal: string
  year: number
  doi: string
  citations: number
  sampleSize: number | null
  outcome: StudyOutcome
  status: PublicationStatus
  institution: string
  openAccess: boolean
  tags: string[]
}

export type TrialStatus = 'Recruiting' | 'Ongoing' | 'Completed' | 'Not yet recruiting'
export type TrialPhase = 'Phase I' | 'Phase II' | 'Phase III' | 'Phase IV' | 'Observational'

export interface ClinicalTrial {
  id: string
  registrationId: string // e.g. CTRI/2024/01/012345
  title: string
  system: AyushSystem
  condition: string
  intervention: string
  phase: TrialPhase
  status: TrialStatus
  sponsor: string
  location: string
  participants: number
  startDate: string
  primaryOutcome: string
}

export interface Disease {
  id: string
  name: string
  category: string
  description: string
  systemsStudied: AyushSystem[]
  researchCount: number
  trialCount: number
  topInterventions: string[]
  evidenceSummary: string
}

export interface SystemInfo {
  id: string
  name: AyushSystem
  slug: string
  tagline: string
  description: string
  origin: string
  researchCount: number
  trialCount: number
  keyAreas: string[]
  accent: string // tailwind text/border colour token
}

export interface PortalStat {
  label: string
  value: number
  suffix?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'Researcher' | 'Doctor' | 'Student' | 'Policymaker' | 'Public'
  institution?: string
  avatarInitials: string
}

export interface SearchFilters {
  systems: AyushSystem[]
  evidenceLevels: EvidenceLevel[]
  yearFrom: number | null
  yearTo: number | null
  openAccessOnly: boolean
  contentType: 'all' | 'research' | 'trials'
  sortBy: 'relevance' | 'recent' | 'citations' | 'evidence'
}
