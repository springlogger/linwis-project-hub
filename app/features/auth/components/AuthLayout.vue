<script lang="ts" setup>
import AuthLogo from '~/assets/image/Auth_logo.png'
</script>

<template>
  <div class="min-h-screen p-10">
    <main class="flex h-[calc(100vh-5rem)] flex-row gap-x-10">
      <div class="image-container flex min-h-0 flex-1 justify-center">
        <img
          alt="Auth logo"
          :src="AuthLogo"
          class="max-h-full max-w-full rounded-[1.5rem] object-contain"
        />
      </div>

      <div class="form-container flex flex-1 flex-col items-center justify-center">
        <div class="w-full max-w-[28.75rem]">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>