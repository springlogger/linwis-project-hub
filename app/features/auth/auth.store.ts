import { defineStore } from 'pinia'
import type { User } from '../../stores/user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isInitialized = ref(false);
  const isAuthenticated = computed(() => token.value !== null)

  const loadAuthToken = () => {
    if (!import.meta.client) return;
    token.value = localStorage.getItem("Authorization");
  }

  const authMe = async () => {

    const data = await $fetch<{ user: User }>('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    // user.value = data.user
    return data.user

  }

  const registration = (name:string, email: string, password: string) => {

  }

  const initAuth = async () => {
    try {

      if (isInitialized.value) return;
      
      loadAuthToken();

      if (!token.value) return;

      //TODO: Проверка JWTExpired
      
      await authMe();

    } catch (e) {
      //TODO: Очищаем авторизацию
    } finally {
      isInitialized.value = true;
    }
  }

  const clearAuth = () => {
    token.value = null;
  }

  return {
    isInitialized,
    isAuthenticated,
    token,

    initAuth,
    clearAuth,
  }
})
