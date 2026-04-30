<script lang="ts" setup>
import {
  faBell,
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import WorkspaceUserMenu from './WorkspaceUserMenu.vue'
</script>

<template>
  <header
    class="flex h-14 shrink-0 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg-third)] px-6"
  >
    <div class="flex min-w-0 flex-1 items-center gap-1.5">
      <span class="text-xs text-[var(--color-third)]">Projects</span>
      <font-awesome
        :icon="faChevronRight"
        class="h-3 w-3 shrink-0 text-[var(--color-third)]"
      />
      <span class="truncate text-xs font-medium text-[var(--color-text-light)]">Acme Website Redesign</span>
    </div>

    <label class="relative hidden h-[34px] w-[220px] shrink-0 sm:block">
      <font-awesome
        :icon="faMagnifyingGlass"
        class="pointer-events-none absolute left-3 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-[var(--color-third)]"
      />
      <input
        type="text"
        placeholder="Search..."
        class="h-full w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 pl-8 text-xs text-[var(--color-text)] outline-none ring-0 transition-all duration-150 placeholder:text-[var(--color-third)] hover:border-[var(--color-border-active)] hover:shadow-[0_0_0_3px_var(--color-primary-soft)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_var(--color-primary-badge)] focus-visible:outline-none focus-visible:ring-0"
      />
    </label>

    <div class="flex items-center gap-2">
      <button
        type="button"
        aria-label="Notifications"
        class="group relative flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-light)] transition duration-150 hover:-translate-y-px hover:border-[var(--color-border-active)] hover:bg-[var(--color-surface-hover)]"
      >
        <font-awesome
          :icon="faBell"
          class="h-[15px] w-[15px]"
        />
        <span class="absolute right-1 top-1 h-[7px] w-[7px] rounded-full border-[1.5px] border-[var(--color-bg-third)] bg-[var(--color-red)]" />
      </button>

      <button
        type="button"
        class="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-xs font-medium text-[var(--color-text-light)] transition duration-150 hover:border-[var(--color-border-active)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
      >
        <font-awesome
          :icon="faShareNodes"
          class="h-[13px] w-[13px]"
        />
        Share
      </button>

      <button
        type="button"
        class="flex h-[34px] cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] px-3.5 text-xs font-semibold text-white shadow-[0_2px_12px_var(--color-primary-shadow)] transition duration-150 hover:-translate-y-px hover:opacity-90 hover:shadow-[0_4px_20px_var(--color-primary-shadow-strong)] active:translate-y-0 active:opacity-100"
      >
        <font-awesome
          :icon="faPlus"
          class="h-[13px] w-[13px]"
        />
        New Task
      </button>

      <WorkspaceUserMenu />
    </div>
  </header>
</template>
