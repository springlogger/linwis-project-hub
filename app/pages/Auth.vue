<script lang="ts" setup>
import AuthLayout from '~/features/auth/components/AuthLayout.vue';
import LoginForm from '~/features/auth/components/LoginForm.vue';
import RegisterForm from '~/features/auth/components/RegisterForm.vue';

const route = useRoute()
const router = useRouter()

const mode = computed(() => {
  return route.query.mode === 'login' ? 'login' : 'register'
})

function setMode(value: 'login' | 'register') {
  router.push({
    path: '/auth',
    query: {
      mode: value,
    },
  })
}

</script>

<template>
  <AuthLayout>
    <LoginForm
      v-if="mode === 'login'"
      @switch-to-register="setMode('register')"
    />

    <RegisterForm
      v-else
      @switch-to-login="setMode('login')"
    />
  </AuthLayout>
</template>