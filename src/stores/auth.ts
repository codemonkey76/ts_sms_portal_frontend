import type { UserData } from '@/Types/User'
import { defineStore } from 'pinia'

export type AuthState = {
  authenticated: boolean;
  user_data: UserData | null;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user_data: null as UserData | null,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state: AuthState) => state.authenticated,
    can: (state: AuthState) => (permission: string) => {
      return state.user_data?.permissions.includes(permission) || false
    }
  },

  actions: {
    login(user_data?: UserData | null) {
      console.log("Got some user data", user_data)
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
