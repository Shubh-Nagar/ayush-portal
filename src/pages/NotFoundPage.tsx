import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { Container } from '@/components/common/Container'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-6xl font-semibold text-navy/20">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you're looking for doesn't exist or may have moved. Try searching the evidence
        library instead.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-600"
        >
          <Home className="h-4 w-4" aria-hidden /> Back home
        </Link>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 rounded-lg border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy-50"
        >
          <Search className="h-4 w-4" aria-hidden /> Search research
        </Link>
      </div>
    </Container>
  )
}
