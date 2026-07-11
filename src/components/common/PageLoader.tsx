/** Full-height spinner shown while a lazy-loaded route resolves. */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
    </div>
  )
}
