import { defineStore } from 'pinia'

export type User = {
  id: string
  name: string | null
  email: string
}

export const useUserStore = defineStore('user', () => {
  const id = ref('')
  const name = ref<string | null>(null)
  const email = ref('')

  const isEmpty = computed(() => id.value === '')

  const setUser = (user: User) => {
    id.value = user.id
    name.value = user.name
    email.value = user.email
  }

  const clearUser = () => {
    id.value = ''
    name.value = null
    email.value = ''
  }

  return {
    id,
    name,
    email,
    isEmpty,
    setUser,
    clearUser,
  }
})