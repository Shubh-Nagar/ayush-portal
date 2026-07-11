import { cn } from '@/lib/utils'

/** Shimmer placeholder used while mock API calls resolve. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-slate-200/70',
        'after:absolute after:inset-0 after:-translate-x-full',
        'after:animate-[shimmer_1.4s_infinite]',
        'after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent',
        className
      )}
    />
  )
}
