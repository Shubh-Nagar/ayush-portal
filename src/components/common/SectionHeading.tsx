import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-saffron-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && (
        <p className="mt-3 text-slate-600">{description}</p>
      )}
    </div>
  )
}
