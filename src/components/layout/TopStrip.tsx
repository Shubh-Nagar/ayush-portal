import { Link } from 'react-router-dom'

/**
 * The thin identity strip that sits above the main navigation.
 */
export function TopStrip() {
  return (
    <div className="border-b border-navy-100 bg-navy text-white">
      {/* tricolour hairline */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-india" />
      </div>
      <div className="container-page flex h-9 items-center justify-between text-xs">
        <p className="text-white/80">
          An evidence-based AYUSH research platform
        </p>
        <div className="hidden items-center gap-4 sm:flex">
          <a href="#main" className="text-white/80 hover:text-white">
            Skip to content
          </a>
          <span className="h-3 w-px bg-white/20" />
          <Link to="/contact" className="text-white/80 hover:text-white">
            Help
          </Link>
          <span className="h-3 w-px bg-white/20" />
          <span className="font-mono text-white/60">हिंदी | English</span>
        </div>
      </div>
    </div>
  )
}
