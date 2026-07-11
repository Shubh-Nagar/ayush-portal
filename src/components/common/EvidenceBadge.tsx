import { useState } from 'react'
import { cn, EVIDENCE_META } from '@/lib/utils'
import type { EvidenceLevel } from '@/types'

interface EvidenceBadgeProps {
  level: EvidenceLevel
  showLabel?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/**
 * The portal's signature element: a colour-graded evidence badge that tells a
 * user, at a glance, how credible the research behind a claim is.
 */
export function EvidenceBadge({
  level,
  showLabel = true,
  size = 'md',
  className,
}: EvidenceBadgeProps) {
  const [open, setOpen] = useState(false)
  const meta = EVIDENCE_META[level]

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        tabIndex={0}
        role="button"
        aria-label={`Evidence level ${level}: ${meta.label}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-medium',
          meta.colorClass,
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        )}
      >
        <span className={cn('h-2 w-2 rounded-full', meta.dot)} aria-hidden />
        <span className="font-mono font-semibold">Level {level}</span>
        {showLabel && <span className="hidden sm:inline">· {meta.short}</span>}
      </span>

      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg
                     border border-navy-100 bg-white p-3 text-left text-xs shadow-card-hover"
        >
          <span className="block font-semibold text-navy">{meta.label}</span>
          <span className="mt-1 block text-slate-600">{meta.description}</span>
        </span>
      )}
    </span>
  )
}
