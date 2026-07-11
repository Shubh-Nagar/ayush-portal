import { Outlet } from 'react-router-dom'
import { TopStrip } from '@/components/layout/TopStrip'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export function RootLayout() {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <TopStrip />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
