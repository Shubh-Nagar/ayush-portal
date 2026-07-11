import { create } from 'zustand'

interface UiState {
  mobileNavOpen: boolean
  setMobileNav: (open: boolean) => void
  toggleMobileNav: () => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNav: (open) => set({ mobileNavOpen: open }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
}))
