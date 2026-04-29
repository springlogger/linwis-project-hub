<script lang="ts" setup>
import type { TaskBreakdownItem } from '../dashboard.data'
import { getDonutSegments } from '../dashboard.helpers'

type Props = {
  items: TaskBreakdownItem[]
}

const props = defineProps<Props>()

const donutSegments = computed(() => getDonutSegments(props.items))
const totalTasks = computed(() => props.items.reduce((total, item) => total + item.count, 0))
</script>

<template>
  <div class="app-panel p-4">
    <div class="mb-3.5">
      <span class="app-panel-title">Task Breakdown</span>
    </div>
    <div class="flex items-center gap-5">
      <div class="shrink-0">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            v-for="segment in donutSegments"
            :key="segment.label"
            cx="50"
            cy="50"
            r="38"
            fill="none"
            :stroke="segment.color"
            stroke-width="12"
            :stroke-dasharray="`${segment.dashLength} ${segment.circumference}`"
            :transform="`rotate(${segment.rotation}, 50, 50)`"
          />
          <text x="50" y="46" text-anchor="middle" fill="#f1eff5" font-size="18" font-weight="700" font-family="Inter">{{ totalTasks }}</text>
          <text x="50" y="58" text-anchor="middle" fill="#6b6382" font-size="8" font-family="Inter">Total</text>
        </svg>
      </div>

      <div class="flex flex-1 flex-col gap-2">
        <div v-for="item in items" :key="item.label" class="flex items-center gap-2">
          <div class="h-2 w-2 shrink-0 rounded-full" :style="{ background: item.color }" />
          <span class="flex-1 text-[12px] text-[var(--color-text-light)]">{{ item.label }}</span>
          <span class="text-[12px] font-semibold text-[var(--color-text)]">{{ item.count }}</span>
          <span class="w-8 text-right text-[11px] text-[var(--color-third)]">{{ item.pct }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
