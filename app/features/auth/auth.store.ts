import { defineStore } from 'pinia'
import { useUserStore, type User } from '../../stores/user'

export const useAuthStore = defineStore('auth', () => {
  const user = useUserStore()

  const isInitialized = ref(false)
  const isFetching = ref(false)

  const isAuthenticated = computed(() => !user.isEmpty)

  const authMe = async () => {
    const data = await $fetch<{ user: User }>('/api/auth/me', {
      headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined,
    })

    user.setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    isFetching.value = true

    try {
      const data = await $fetch<{ user: User }>('/api/auth/register', {
        method: 'POST',
        body: {
          name,
          email,
          password,
        },
      })

      user.setUser(data.user)

      await navigateTo('/app/dashboard')
    } catch (e) {
      user.clearUser()
      throw e
    } finally {
      isFetching.value = false
    }
  }

  const login = async (email: string, password: string) => {
    isFetching.value = true

    try {
      const data = await $fetch<{ user: User }>('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      user.setUser(data.user)

      await navigateTo('/app/dashboard')
    } catch (e) {
      user.clearUser()
      throw e
    } finally {
      isFetching.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', {
      method: 'POST',
    })

    clearAuth()

    await navigateTo('/auth?mode=login')
  }

  const initAuth = async () => {
    if (isInitialized.value) return

    isFetching.value = true

    try {
      await authMe()
    } catch {
      user.clearUser()
    } finally {
      isFetching.value = false
      isInitialized.value = true
    }
  }

  const clearAuth = async () => {
    user.clearUser()

    await $fetch("/api/auth/logout")
  }

  return {
    isInitialized,
    isFetching,
    isAuthenticated,

    initAuth,
    clearAuth,
    authMe,
    register,
    login,
    logout,
  }
})
