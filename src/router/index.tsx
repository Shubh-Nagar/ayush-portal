import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { PageLoader } from '@/components/common/PageLoader'

// Eager-load the home page (first paint); lazy-load the rest for a smaller
// initial bundle and faster loading.
const SearchResultsPage = lazy(() =>
  import('@/pages/SearchResultsPage').then((m) => ({ default: m.SearchResultsPage }))
)
const ResearchLibraryPage = lazy(() =>
  import('@/pages/ResearchLibraryPage').then((m) => ({ default: m.ResearchLibraryPage }))
)
const ResearchDetailPage = lazy(() =>
  import('@/pages/ResearchDetailPage').then((m) => ({ default: m.ResearchDetailPage }))
)
const ClinicalTrialsPage = lazy(() =>
  import('@/pages/ClinicalTrialsPage').then((m) => ({ default: m.ClinicalTrialsPage }))
)
const DiseasesPage = lazy(() =>
  import('@/pages/DiseasesPage').then((m) => ({ default: m.DiseasesPage }))
)
const SystemPage = lazy(() =>
  import('@/pages/SystemPage').then((m) => ({ default: m.SystemPage }))
)
const UploadPage = lazy(() =>
  import('@/pages/UploadPage').then((m) => ({ default: m.UploadPage }))
)
const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
)
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
)
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)
const CollaborationPage = lazy(() =>
  import('@/pages/CollaborationPage').then((m) => ({ default: m.CollaborationPage }))
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)
const FaqPage = lazy(() => import('@/pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

// Wrap lazy pages in a Suspense boundary.
const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{node}</Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: withSuspense(<SearchResultsPage />) },
      { path: 'research', element: withSuspense(<ResearchLibraryPage />) },
      { path: 'research/:id', element: withSuspense(<ResearchDetailPage />) },
      { path: 'trials', element: withSuspense(<ClinicalTrialsPage />) },
      { path: 'diseases', element: withSuspense(<DiseasesPage />) },
      { path: 'system/:slug', element: withSuspense(<SystemPage />) },
      { path: 'upload', element: withSuspense(<UploadPage />) },
      { path: 'login', element: withSuspense(<LoginPage />) },
      { path: 'register', element: withSuspense(<RegisterPage />) },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'collaborate', element: withSuspense(<CollaborationPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'faq', element: withSuspense(<FaqPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
])
