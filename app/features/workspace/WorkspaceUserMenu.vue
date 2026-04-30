<script lang="ts" setup>
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import {
  faBell,
  faChevronDown,
  faFileLines,
  faGear,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useDropdown } from '~/composables/useDropdown'
import { useAuthStore } from '../auth/auth.store'

type DropdownItem = {
  icon: IconDefinition
  label: string
  badge?: string
}

const dropdownItems: DropdownItem[] = [
  { icon: faUser, label: 'My Profile' },
  { icon: faGear, label: 'Account Settings' },
  { icon: faBell, label: 'Notifications' },
  { icon: faFileLines, label: 'Workspace Plan', badge: 'Free' },
]

const { isOpen: profileOpen, buttonRef: profileButtonRef, menuRef: dropdownMenuRef } = useDropdown()

const auth = useAuthStore()

</script>

<template>
  <div class="relative">
    <button
      ref="profileButtonRef"
      type="button"
      class="flex h-[34px] cursor-pointer items-center gap-2 rounded-lg border px-2 transition duration-150 hover:border-[var(--color-border-active-strong)] hover:bg-[var(--color-surface-hover)]"
      :class="profileOpen ? 'border-[var(--color-border-active-strong)] bg-[var(--color-surface-hover)]' : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)]'"
      @click="profileOpen = !profileOpen"
    >
      <span class="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-semibold tracking-normal text-white">
        JS
      </span>
      <div class="hidden flex-col leading-tight md:flex">
        <span class="text-[11px] font-semibold text-[var(--color-text)]">John Smith</span>
        <span class="text-[10px] text-[var(--color-third)]">Admin</span>
      </div>
      <font-awesome
        :icon="faChevronDown"
        class="h-3 w-3 text-[var(--color-third)] transition-transform duration-200"
        :class="{ 'rotate-180': profileOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-1.5 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1.5 opacity-0"
    >
      <div
        v-if="profileOpen"
        ref="dropdownMenuRef"
        class="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] rounded-xl border border-white/10 bg-[var(--color-surface-dropdown)] p-1.5 shadow-[0_16px_48px_var(--color-dropdown-shadow),0_0_0_1px_var(--color-primary-soft)]"
      >
        <div class="flex items-center gap-2.5 px-2.5 pb-2 pt-2.5">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">JS</div>
          <div class="min-w-0">
            <div class="truncate text-[13px] font-semibold text-[var(--color-text)]">John Smith</div>
            <div class="truncate text-[11px] text-[var(--color-third)]">john@acme.com</div>
          </div>
        </div>

        <div class="my-1 h-px bg-[var(--color-border)]" />

        <button
          v-for="item in dropdownItems"
          :key="item.label"
          type="button"
          class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-[13px] text-[var(--color-text-light)] transition duration-150 hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-text)]"
        >
          <font-awesome
            :icon="item.icon"
            class="h-3.5 w-3.5 shrink-0"
          />
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="rounded bg-[var(--color-primary-badge)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-purple-soft)]"
          >
            {{ item.badge }}
          </span>
        </button>

        <div class="my-1 h-px bg-[var(--color-border)]" />

        <button
          type="button"
          class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-2 text-[13px] text-[var(--color-text-light)] transition duration-150 hover:bg-[var(--color-red-soft)] hover:text-[var(--color-red)]"
          @click="auth.logout()"
        >
          <font-awesome
            :icon="faRightFromBracket"
            class="h-3.5 w-3.5"
          />
          Sign out
        </button>
      </div>
    </Transition>
  </div>
</template>
