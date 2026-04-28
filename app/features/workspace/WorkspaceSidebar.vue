<script lang="ts" setup>
import ProjectLogo from '~/assets/image/ProjectLogo.png'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import {
  faHouse,
  faFolder,
  faSquareCheck,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons'

const isSidebarOpen = ref(true)

type SidebarNavItem = {
  name: string
  to: string
  icon: IconDefinition
}

const sidebarNavItems: SidebarNavItem[] = [
  { name: 'Dashboard', to: '/app/dashboard', icon: faHouse },
  { name: 'Projects', to: '/app/projects', icon: faFolder },
  { name: 'Tasks', to: '/app/tasks', icon: faSquareCheck },
  { name: 'Team', to: '/app/team', icon: faUsers },
  { name: 'Settings', to: '/app/settings', icon: faGear },
]
</script>

<template>
  <div
    class="flex h-full flex-col overflow-hidden text-[var(--color-third)] transition-[width] duration-300 ease-in-out"
    :class="isSidebarOpen ? 'w-56' : 'w-16'"
  >
    <header class="flex h-16 shrink-0 flex-row items-center px-4">
      <img
        :src="ProjectLogo"
        alt="Logo"
        class="h-8 w-8 shrink-0 rounded-full"
      />

      <p
        class="ml-2 overflow-hidden whitespace-nowrap font-bold text-[var(--color-text)] transition-all duration-200"
        :class="isSidebarOpen ? 'max-w-40 opacity-100' : 'ml-0 max-w-0 opacity-0'"
      >
        Linwis Project
      </p>
    </header>

    <main class="min-h-0 flex-1 px-4 py-2 text-sm font-medium">
      
      <nav>
        <ul class="flex flex-col gap-y-2">
          <li v-for="item in sidebarNavItems" :key="item.name">
            <NuxtLink
              :to="item.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="relative flex h-9 cursor-pointer flex-row items-center rounded-lg transition-colors"
                :class="[
                  isSidebarOpen ? 'px-3' : 'justify-center px-0',
                  isActive
                    ? 'bg-[var(--color-primary-light)] text-[var(--color-text)] font-semibold'
                    : 'text-[var(--color-third)] hover:bg-white/[0.04] hover:text-[var(--color-text-light)]'
                ]"
              >
                <span
                  v-if="isActive"
                  class="absolute -left-4 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--color-primary)]"
                />

                <span class="flex h-4 w-4 shrink-0 items-center justify-center">
                  <font-awesome :icon="item.icon" class="h-4 w-4" />
                </span>

                <span
                  class="ml-2 overflow-hidden whitespace-nowrap transition-all duration-200"
                  :class="isSidebarOpen ? 'max-w-32 opacity-100' : 'ml-0 max-w-0 opacity-0 hidden'"
                >
                  {{ item.name }}
                </span>
              </a>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </main>

    <footer
      class="mt-auto flex h-10 shrink-0 cursor-pointer flex-row items-center border-t border-white/10 px-4 text-sm text-[var(--color-third)] transition hover:text-[var(--color-text)]"
      :class="isSidebarOpen ? 'justify-start' : 'justify-center'"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <svg
        class="h-[22px] w-[22px] shrink-0 transition-transform duration-300"
        :class="{ '-scale-x-100': !isSidebarOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
      </svg>

      <p
        class="ml-1 overflow-hidden whitespace-nowrap transition-all duration-200"
        :class="isSidebarOpen ? 'max-w-24 opacity-100' : 'ml-0 max-w-0 opacity-0'"
      >
        Collapse
      </p>
    </footer>
  </div>
</template>