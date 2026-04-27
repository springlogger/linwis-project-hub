import { defineStore } from 'pinia'

export type User = {
  id: number,
  name: string,
  email: string,
}

export const useUserStore = defineStore('user', () => {
  const name = ref("")

  const auth = (email: string, password: string) => {

  }

  const registration = (name:string, email: string, password: string) => {

  }

  return name;
})
