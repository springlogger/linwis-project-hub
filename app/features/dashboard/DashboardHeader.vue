<script lang="ts" setup>
import { faStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
  title: string
  subtitle?: string
  badge?: string | number
  starred?: boolean
  tabs?: readonly string[]
}

defineProps<Props>()

const activeTab = defineModel<string>('activeTab')
</script>

<template>
  <div class="shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg-third)] px-5 pt-2">
    <div class="mb-2 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1 flex items-center gap-2">
          <h1 class="text-xl font-bold tracking-tight text-[var(--color-text)]">{{ title }}</h1>
          <font-awesome v-if="starred" :icon="faStar" class="h-4 w-4 text-[var(--color-orange)]" />
          <span
            v-if="badge !== undefined"
            class="rounded-full bg-[var(--color-primary-light)] px-2 py-px text-[0.6875rem] font-semibold text-[var(--color-primary)]"
          >
            {{ badge }}
          </span>
        </div>
        <p v-if="subtitle" class="text-xs text-[var(--color-third)]">{{ subtitle }}</p>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <div v-if="tabs?.length" class="flex items-center gap-x-4 overflow-x-auto overflow-y-hidden">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        class="-mb-px cursor-pointer whitespace-nowrap border-b-2 bg-transparent py-2 text-[0.8125rem] transition-all duration-150"
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
