import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  /** Mock sign-in — replace with a real OTP/OAuth call to the backend. */
  login: (user: User) => void
  loginWithEmail: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      loginWithEmail: (email) =>
        set({
          isAuthenticated: true,
          user: {
            id: 'u-' + Math.random().toString(36).slice(2, 8),
            name: email.split('@')[0].replace(/[._]/g, ' ') || 'Portal User',
            email,
            role: 'Researcher',
            avatarInitials: (email[0] ?? 'U').toUpperCase(),
          },
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'ayush-auth' }
  )
)
