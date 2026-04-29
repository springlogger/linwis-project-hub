<script lang="ts" setup>
import { faCalendarDays, faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons'

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
          <font-awesome :icon="faStar" class="h-4 w-4 text-[var(--color-orange)]" />
        </div>
        <p class="text-xs text-[var(--color-third)]">Redesigning the corporate website with a focus on UX and performance.</p>
      </div>

      <button type="button" class="app-toolbar-button">
        <font-awesome :icon="faCalendarDays" class="h-[13px] w-[13px]" />
        May 12 - May 18, 2024
        <font-awesome :icon="faChevronDown" class="h-3 w-3" />
      </button>
    </div>

    <div class="flex overflow-x-auto items-center overflow-y-hidden">
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
