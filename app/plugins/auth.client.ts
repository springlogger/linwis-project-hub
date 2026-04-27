import { useAuthStore } from "~/features/auth/auth.store"

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()

  await authStore.initAuth()
})
