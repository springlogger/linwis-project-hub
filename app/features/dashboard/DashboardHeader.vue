<script lang="ts" setup>
type Props = {
  tabs: readonly string[]
}

defineProps<Props>()

const activeTab = defineModel<string>('activeTab', { required: true })
</script>

<template>
  <div class="shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-third)] px-6 pt-5">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1 flex items-center gap-2">
          <h1 class="text-xl font-bold tracking-tight text-[var(--color-text)]">Acme Website Redesign</h1>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <p class="text-xs text-[var(--color-third)]">Redesigning the corporate website with a focus on UX and performance.</p>
      </div>

      <button type="button" class="app-toolbar-button">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        May 12 - May 18, 2024
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>

    <div class="flex overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        class="-mb-px cursor-pointer whitespace-nowrap border-b-2 bg-transparent px-4 py-2 text-[13px] transition-all duration-150"
        :class="activeTab === tab
          ? 'border-[var(--color-primary)] font-semibold text-[var(--color-text)]'
          : 'border-transparent font-normal text-[var(--color-third)] hover:text-[var(--color-text-light)]'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>
