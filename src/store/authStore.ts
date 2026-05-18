import { create } from 'zustand'
import type { User } from '../types/auth.types'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User | null) => void
  logout: () => void
  restoreAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: user !== null }),
  logout: () => {
    localStorage.removeItem('authUser')
    set({ user: null, isLoggedIn: false })
  },
  restoreAuth: () => {
    const stored = localStorage.getItem('authUser')
    if (stored) {
      const user: User = JSON.parse(stored) as User
      set({ user, isLoggedIn: true })
    }
  },
}))
