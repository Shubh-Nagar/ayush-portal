import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Logo } from '@/components/layout/Logo'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

const ROLES: User['role'][] = ['Researcher', 'Doctor', 'Student', 'Policymaker', 'Public']

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<User['role']>('Researcher')
  const [institution, setInstitution] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    login({
      id: 'u-' + Math.random().toString(36).slice(2, 8),
      name: name || 'Portal User',
      email,
      role,
      institution: institution || undefined,
      avatarInitials: (name[0] ?? email[0] ?? 'U').toUpperCase(),
    })
    navigate('/dashboard')
  }

  return (
    <div className="bg-paper py-16">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white p-8 shadow-card">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Join researchers, clinicians and students across India.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={regInput}
                  placeholder="Dr. Priya Sharma"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-navy">
                  Email
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={regInput}
                  placeholder="you@institution.ac.in"
                />
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-navy">I am a…</span>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                        role === r
                          ? 'border-navy bg-navy text-white'
                          : 'border-navy/15 text-slate-600 hover:bg-navy-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="inst" className="mb-1.5 block text-sm font-medium text-navy">
                  Institution <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id="inst"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className={regInput}
                  placeholder="e.g. AIIA, New Delhi"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <UserPlus className="h-4 w-4" aria-hidden /> Create account{' '}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already registered?{' '}
              <Link to="/login" className="font-medium text-navy underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

const regInput =
  'w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm focus:border-chakra focus:outline-none focus:ring-2 focus:ring-chakra/30'
