<script lang="ts" setup>
import AppleLogo from '~/assets/image/Apple_logo_black.svg'
import GoogleLogo from '~/assets/image/Google__G__logo.svg'

const emit = defineEmits<{
  'switch-to-register': []
}>()
</script>

<template>
  <div class="flex flex-col">
    <form class="flex flex-col gap-y-5">
      <h1 class="text-4xl font-bold">
        Welcome back!
      </h1>

      <div class="flex flex-col">
        <p>Email</p>
        <input class="app-input w-full" placeholder="Email..." />
      </div>

      <div class="flex flex-col">
        <p>Password</p>
        <input class="app-input w-full" placeholder="Password..." type="password" />
      </div>

      <div class="flex items-center justify-between gap-x-4">
        <label class="app-checkbox app-checkbox--square">
          <input
            :checked="false"
            type="checkbox"
            class="app-checkbox__input"
          />

          <span class="app-checkbox__box">
            <svg class="app-checkbox__icon" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.5 10.5L8.2 14L15.5 6"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <span class="app-checkbox__label">
            Remember me
          </span>
        </label>

        <button
          type="button"
          class="text-sm font-bold text-[var(--color-text)] transition hover:text-[var(--color-primary)]"
        >
          Forgot password?
        </button>
      </div>

      <button class="app-primary-button h-[3.25rem] w-full">
        LOGIN
      </button>
    </form>

    <div class="mt-2 flex w-full justify-center">
      <p>
        Don't have account?
        <button
          type="button"
          class="font-bold transition hover:text-[var(--color-primary)]"
          @click="emit('switch-to-register')"
        >
          Sign up
        </button>
      </p>
    </div>

    <div class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-4">
      <div class="h-px bg-white"></div>
      <span class="text-sm font-medium text-white/60">or</span>
      <div class="h-px bg-white"></div>

      <button class="mt-2 flex h-[3.25rem] flex-row items-center justify-center gap-x-2 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] transition duration-150 ease-out hover:-translate-y-[2px] hover:scale-[1.015] active:translate-y-0 active:scale-100">
        <img :src="GoogleLogo" class="h-[1.5rem] rounded-full" />
        <p>Login with Google</p>
      </button>

      <div></div>

      <button class="mt-2 flex h-[3.25rem] flex-row items-center justify-center gap-x-2 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] transition duration-150 ease-out hover:-translate-y-[2px] hover:scale-[1.015] active:translate-y-0 active:scale-100">
        <img :src="AppleLogo" class="h-[1.5rem] rounded-full" />
        <p>Login with Apple</p>
      </button>
    </div>
  </div>
</template>
