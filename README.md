# AYUSH Evidence Portal 🇮🇳

**India's Evidence-Based AYUSH Research Portal** — a modern, accessible, government-grade web application for discovering credible, evidence-graded research across the five AYUSH systems of medicine: **Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy**.

The portal is built to answer one question exceptionally well:

> **"Is there credible, evidence-based research available for this medicine / herb / treatment / disease?"**

Every search returns a plain-language **verdict** plus results graded on a transparent **A–D evidence ladder**, so researchers, doctors, students, policymakers and the public can judge trustworthiness at a glance.

---

## ✨ Key features

- **Semantic-style search** with autosuggest, keyboard navigation and example queries.
- **Evidence grading system (A–D)** — the signature feature. Every study is placed on a credibility ladder (Systematic Review → RCT → Observational → Preclinical/Traditional).
- **Plain-language verdict banner** answering "is there evidence?" on every search.
- **Research Library** with advanced filters (evidence level, system, year, open access, sort).
- **Clinical Trials registry** with status filtering (CTRI-style records).
- **Diseases / conditions** browser with per-condition evidence summaries.
- **Per-system pages** (Ayurveda, Unani, etc.) with stats and curated research.
- **Research detail pages** with an AI plain-language summary placeholder and related studies.
- **Upload** flow for articles & patents with a review workflow.
- **Login / Register** — Email + OTP flow and Google sign-in (mocked, ready for real OAuth).
- **User Dashboard** with saved research, collections and a community feed.
- **Institutional Collaboration** page.
- **AI feature placeholders** — Semantic Search, AI Summaries, Recommendations.
- **About, Contact, FAQ** and a friendly 404.
- **Fully responsive** (mobile / tablet / desktop), **WCAG-minded** (skip links, focus rings, reduced-motion support, ARIA), and **SEO-friendly** (meta tags, Open Graph, JSON-LD).

---

## 🧱 Tech stack

| Layer            | Choice                                       |
| ---------------- | -------------------------------------------- |
| Framework        | React 18 + **Vite 5**                        |
| Language         | **TypeScript** (strict)                      |
| Styling          | **Tailwind CSS** 3                           |
| Routing          | **React Router v6** (lazy-loaded routes)     |
| State management | **Zustand** (auth, search, UI)               |
| Animation        | Framer Motion                                |
| Icons            | lucide-react                                 |

The frontend talks to an in-memory **mock API service** (`src/services/api.ts`) that simulates network latency and returns realistic data — so the whole site is fully interactive with zero backend. The return shapes are already the contract for a real backend; swap the function bodies for `fetch()` calls when the API is ready.

---

## 🚀 Getting started

### Prerequisites
- **Node.js 18+** and npm

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview

# 5. (optional) Lint
npm run lint
```

That's it — no environment variables are required to run the demo. An optional
`.env` (see `.env.example`) can point to a real backend and Google OAuth client
when you're ready to wire them up.

---

## 📁 Project structure

```
ayush-portal/
├── index.html                 # SEO meta, fonts, JSON-LD structured data
├── package.json
├── vite.config.ts             # Vite + "@/…" path alias
├── tailwind.config.js         # GoI palette + evidence colours + type scale
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx               # App entry
    ├── App.tsx                # RouterProvider
    ├── index.css              # Tailwind layers + a11y helpers
    ├── router/                # Route table (lazy-loaded pages)
    ├── layouts/
    │   └── RootLayout.tsx     # Top strip + navbar + footer + skip link
    ├── components/
    │   ├── common/            # Button, Badge, EvidenceBadge, Skeleton, …
    │   ├── layout/            # TopStrip, Logo, Navbar, MobileNav, Footer
    │   ├── home/              # Hero, EvidenceExplainer, SystemsGrid, …
    │   └── search/            # SearchBar, ResearchCard, TrialCard, Filters
    ├── pages/                 # 16 route pages
    ├── store/                 # Zustand stores: auth, search, ui
    ├── services/api.ts        # Mock API (search, verdict, suggestions)
    ├── data/                  # Mock corpus: research, trials, diseases, systems
    ├── hooks/                 # useDebounce, useScrollToTop
    ├── lib/utils.ts           # cn(), evidence metadata, formatters
    └── types/                 # Shared TypeScript domain types
```

---

## 🎨 Design system

A refined Government-of-India palette, tuned for readability and trust:

- **Navy** `#0B2E4F` — institutional trust / primary
- **Saffron** `#E8791B` — accent (used sparingly)
- **India green** `#0F7B3E` — "evidence found" / positive states
- **Ashoka blue** `#1A3A8F` — secondary accent
- **Paper** `#FBF9F4` — warm off-white background

**Typography:** *Source Serif 4* (display) · *IBM Plex Sans* (body) · *IBM Plex Mono* (data/labels).

**Evidence colour scale:** green (A) → blue (B) → amber (C) → slate (D).

---

## 🔌 Connecting a real backend

Replace the mock functions in `src/services/api.ts` with real calls, e.g.:

```ts
export async function search(query: string, filters = {}) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, filters }),
  })
  return res.json() as Promise<SearchResponse>
}
```

The components already consume the typed return shapes, so no UI changes are needed.

---

## ♿ Accessibility & SEO notes

- Skip-to-content link, visible keyboard focus rings, ARIA roles on interactive widgets.
- `prefers-reduced-motion` respected globally.
- Semantic landmarks (`header`, `main`, `nav`, `footer`), labelled form fields.
- Descriptive `<title>`, meta description, Open Graph tags and JSON-LD in `index.html`.

---

## ⚠️ Disclaimer

This portal indexes and grades published research for **discovery and educational purposes only**. It is **not medical advice**. All data included in this build is **illustrative mock content** for demonstration; titles, journals and institutions are representative placeholders. Always consult a registered practitioner before making treatment decisions.

---

*Built as a production-ready starter for an AYUSH research-discovery initiative.*
