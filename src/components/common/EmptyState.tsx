import { SearchX } from 'lucide-react'

export function EmptyState({
  title,
  message,
  icon: Icon = SearchX,
}: {
  title: string
  message: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50">
        <Icon className="h-7 w-7 text-navy" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-600">{message}</p>
    </div>
  )
}
