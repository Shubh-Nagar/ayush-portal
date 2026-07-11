import { Navigate, Link } from 'react-router-dom'
import {
  Bookmark,
  MessagesSquare,
  TrendingUp,
  Bell,
  LogOut,
  FolderOpenDot,
  ThumbsUp,
  Plus,
} from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { EvidenceBadge } from '@/components/common/EvidenceBadge'
import { useAuthStore } from '@/store/authStore'
import { RESEARCH } from '@/data/research'

const COMMUNITY = [
  {
    id: 'c1',
    author: 'Dr. Meera Nair',
    role: 'Researcher · AIIA',
    time: '2h ago',
    text: 'Anyone working on standardising Ashwagandha dosing for anxiety RCTs? Heterogeneity across trials is a real barrier to meta-analysis.',
    topic: 'Ayurveda',
    replies: 12,
    likes: 34,
  },
  {
    id: 'c2',
    author: 'Rahul Verma',
    role: 'PhD Student · S-VYASA',
    time: '5h ago',
    text: 'Sharing our protocol for a yoga-nidra insomnia trial. Feedback on the actigraphy endpoints welcome before we register on CTRI.',
    topic: 'Yoga & Naturopathy',
    replies: 7,
    likes: 21,
  },
  {
    id: 'c3',
    author: 'Dr. A. Siddiqui',
    role: 'Clinician · NIUM',
    time: '1d ago',
    text: 'Reminder: negative results matter. Great to see the portal surfacing Level-B trials that found no effect — that transparency builds trust.',
    topic: 'Evidence',
    replies: 19,
    likes: 58,
  },
]

export function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />

  const saved = RESEARCH.slice(0, 3)

  return (
    <div className="bg-paper pb-16">
      {/* Header */}
      <div className="border-b border-navy/10 bg-white">
        <Container className="py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-xl font-semibold text-white">
                {user.avatarInitials}
              </span>
              <div>
                <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
                <p className="text-sm text-slate-600">
                  {user.role}
                  {user.institution ? ` · ${user.institution}` : ''}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" aria-hidden /> Sign out
            </Button>
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Bookmark, label: 'Saved studies', value: 3 },
            { icon: FolderOpenDot, label: 'Collections', value: 2 },
            { icon: MessagesSquare, label: 'Discussions', value: 8 },
            { icon: Bell, label: 'New alerts', value: 5 },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <s.icon className="h-5 w-5 text-navy" aria-hidden />
              <p className="mt-3 text-2xl font-semibold text-navy">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Community feed */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MessagesSquare className="h-5 w-5 text-saffron-600" aria-hidden /> Community
              </h2>
              <Button size="sm">
                <Plus className="h-4 w-4" aria-hidden /> New post
              </Button>
            </div>

            <div className="space-y-4">
              {COMMUNITY.map((post) => (
                <article key={post.id} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-sm font-semibold text-navy">
                        {post.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-navy">{post.author}</p>
                        <p className="text-xs text-slate-500">{post.role} · {post.time}</p>
                      </div>
                    </div>
                    <Badge tone="outline">{post.topic}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{post.text}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" aria-hidden /> {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessagesSquare className="h-3.5 w-3.5" aria-hidden /> {post.replies} replies
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Sidebar: saved + trending */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
                <Bookmark className="h-4 w-4 text-saffron-600" aria-hidden /> Saved research
              </h2>
              <div className="space-y-3">
                {saved.map((a) => (
                  <Link
                    key={a.id}
                    to={`/research/${a.id}`}
                    className="block rounded-lg border border-navy/5 p-3 hover:bg-navy-50"
                  >
                    <div className="mb-1.5">
                      <EvidenceBadge level={a.evidenceLevel} size="sm" showLabel={false} />
                    </div>
                    <p className="line-clamp-2 text-sm font-medium text-navy">{a.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-card">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
                <TrendingUp className="h-4 w-4 text-saffron-600" aria-hidden /> Trending topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Ashwagandha', 'Yoga nidra', 'Curcumin', 'Guduchi', 'Insomnia', 'Diabetes'].map(
                  (t) => (
                    <Link
                      key={t}
                      to={`/search?q=${encodeURIComponent(t)}`}
                      className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy hover:bg-navy-100"
                    >
                      #{t.replace(/\s/g, '')}
                    </Link>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}
