import type { UserData } from '@/Types/User'
import { defineStore } from 'pinia'

export type AuthState = {
  authenticated: boolean
  user_data: UserData | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user_data: null as UserData | null,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state: AuthState) => state.authenticated,
    can: (state: AuthState) => (permission: string | string[] | undefined) => {
      if (
        !permission ||
        permission.length === 0 ||
        (Array.isArray(permission) && permission.every((p) => !p))
      )
        return true

      const permissionsToCheck = typeof permission === 'string' ? [permission] : permission

      return permissionsToCheck.every((perm) => state.user_data?.permissions.includes(perm))
    }
  },

  actions: {
    login(user_data?: UserData | null) {
      if (user_data) {
        this.user_data = user_data
      }

      this.authenticated = true
    },
    logout() {
      this.user_data = null
      this.authenticated = false
    },
    setError(message: string) {
      this.error = message
    },
    clearError() {
      this.error = null
    }
  }
})
