import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'saffron'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chakra/60 ' +
  'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-600',
  secondary: 'bg-navy-50 text-navy hover:bg-navy-100',
  saffron: 'bg-saffron text-white hover:bg-saffron-600',
  outline: 'border border-navy/20 text-navy hover:bg-navy-50',
  ghost: 'text-navy hover:bg-navy-50',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

// Link that looks like a button, for internal navigation.
interface LinkButtonProps extends CommonProps {
  to: string
  children: React.ReactNode
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  )
}
