<script lang="ts" setup>
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import AppleLogo from '~/assets/image/Apple_logo_black.svg'
import GoogleLogo from '~/assets/image/Google__G__logo.svg'

const emit = defineEmits<{
  'switch-to-login': []
}>()
</script>

<template>
  <div class="flex flex-col">
    <form class="flex flex-col gap-y-5">
      <h1 class="text-4xl font-bold">
        Join now for success!
      </h1>

      <div class="flex flex-col">
        <p>Name</p>
        <input class="app-input w-full" placeholder="Name..." />
      </div>

      <div class="flex flex-col">
        <p>Email</p>
        <input class="app-input w-full" placeholder="Email..." />
      </div>

      <div class="flex flex-col">
        <p>Password</p>
        <input class="app-input w-full" placeholder="Password..." />

        <div class="mt-2">
          <p>Your password must include:</p>

          <div class="pl-5">
            <label class="app-checkbox app-checkbox--readonly">
              <input
                :checked="true"
                type="checkbox"
                class="app-checkbox__input"
                disabled
              />

              <span class="app-checkbox__box">
                <font-awesome :icon="faCheck" class="app-checkbox__icon" />
              </span>

              <span class="app-checkbox__label">
                Must include at least one number
              </span>
            </label>

            <label class="app-checkbox app-checkbox--readonly">
              <input
                :checked="false"
                type="checkbox"
                class="app-checkbox__input"
                disabled
              />

              <span class="app-checkbox__box">
                <font-awesome :icon="faCheck" class="app-checkbox__icon" />
              </span>

              <span class="app-checkbox__label">
                Min 8 characters
              </span>
            </label>
          </div>
        </div>
      </div>

      <label class="app-checkbox app-checkbox--square">
        <input
          :checked="false"
          type="checkbox"
          class="app-checkbox__input"
        />

        <span class="app-checkbox__box">
          <font-awesome :icon="faCheck" class="app-checkbox__icon" />
        </span>

        <span class="app-checkbox__label">
          I agree with the Terms & Policy
        </span>
      </label>

      <button class="app-primary-button h-[3.25rem] w-full">
        SIGN ME UP!
      </button>
    </form>

    <div class="mt-2 flex w-full justify-center">
      <p>
        Already have account?
        <button
          type="button"
          class="font-bold"
          @click="emit('switch-to-login')"
        >
          Login
        </button>
      </p>
    </div>

    <div class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-4">
      <div class="h-px bg-white"></div>
      <span class="text-sm font-medium text-white/60">or</span>
      <div class="h-px bg-white"></div>

      <button class="mt-2 flex h-[3.25rem] flex-row items-center justify-center gap-x-2 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] transition duration-150 ease-out hover:-translate-y-[2px] hover:scale-[1.015] active:translate-y-0 active:scale-100">
        <img :src="GoogleLogo" class="h-[1.5rem] rounded-full" />
        <p>Sign up with Google</p>
      </button>

      <div></div>

      <button class="mt-2 flex h-[3.25rem] flex-row items-center justify-center gap-x-2 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] transition duration-150 ease-out hover:-translate-y-[2px] hover:scale-[1.015] active:translate-y-0 active:scale-100">
        <img :src="AppleLogo" class="h-[1.5rem] rounded-full" />
        <p>Sign up with Apple</p>
      </button>
    </div>
  </div>
</template>