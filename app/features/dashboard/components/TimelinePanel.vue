<script lang="ts" setup>
import type { TimelineItem } from '../dashboard.data'

type Props = {
  items: TimelineItem[]
}

defineProps<Props>()

const timelineDays = ['12', '14', '16', '18', '20', '22', '24'] as const
</script>

<template>
  <div class="app-panel p-4">
    <div class="mb-3.5 flex items-center justify-between">
      <span class="app-panel-title">Timeline</span>
      <span class="app-link-button">View full -></span>
    </div>
    <div class="mb-2 flex justify-between pl-[110px]">
      <span
        v-for="day in timelineDays"
        :key="day"
        class="w-5 text-center text-[10px] text-[var(--color-third)]"
      >
        {{ day }}
      </span>
    </div>
    <div class="flex flex-col gap-1.5">
      <div v-for="item in items" :key="item.name" class="flex items-center gap-2">
        <span class="w-[102px] shrink-0 truncate text-[10px] text-[var(--color-third)]">{{ item.name }}</span>
        <div class="relative h-4 flex-1 rounded bg-[var(--color-bg-secondary)]">
          <div
            class="absolute top-0 h-full rounded opacity-85"
            :style="{ left: `${item.start}%`, width: `${item.width}%`, background: item.color }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
