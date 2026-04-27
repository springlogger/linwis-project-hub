import { useAuthStore } from "~/features/auth/auth.store"

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (import.meta.server) return

  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.initAuth()
  }

  // if (!authStore.token || isJwtExpired(authStore.token))
  if (!authStore.token) {
    authStore.clearAuth()
    return navigateTo('/auth?mode=login')
  }

})
