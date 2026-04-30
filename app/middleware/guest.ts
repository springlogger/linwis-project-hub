import { useAuthStore } from "~/features/auth/auth.store"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.initAuth()
  }

  if (authStore.isAuthenticated) {
    return navigateTo('/app/dashboard')
  }
})
