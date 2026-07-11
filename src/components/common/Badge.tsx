import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'navy' | 'saffron' | 'green' | 'outline'

const tones: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  navy: 'bg-navy-50 text-navy',
  saffron: 'bg-saffron-50 text-saffron-600',
  green: 'bg-india-50 text-india-700',
  outline: 'border border-navy/15 text-navy',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
