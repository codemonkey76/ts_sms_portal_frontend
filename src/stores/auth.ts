import { defineStore } from 'pinia'

export type AuthState = {
  authenticated: boolean
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
  }),

  getters: {
    isAuthenticated: (state: AuthState) => state.authenticated,
  },

  actions: {
    login() {
      this.authenticated = true
    },
    logout() {
      this.authenticated = false
    },
  }
})
