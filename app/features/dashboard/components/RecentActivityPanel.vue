<script lang="ts" setup>
import type { ActivityItem } from '../dashboard.data'
import { getAvatarBackground, getAvatarInitials, getBadgeStyle } from '../dashboard.helpers'

type Props = {
  items: ActivityItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="app-panel p-4">
    <div class="mb-3.5 flex items-center justify-between">
      <span class="app-panel-title">Recent Activity</span>
      <span class="app-link-button">View all -></span>
    </div>
    <div class="flex flex-col gap-3">
      <div v-for="activity in items" :key="`${activity.user}-${activity.target}-${activity.time}`" class="flex items-start gap-2.5">
        <div
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
          :style="{ background: getAvatarBackground(activity.user) }"
        >
          {{ getAvatarInitials(activity.user) }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-1 leading-relaxed">
            <span class="text-[12px] font-semibold text-[var(--color-text)]">{{ activity.user }}</span>
            <span class="text-[12px] text-[var(--color-third)]">{{ activity.action }}</span>
            <span
              class="app-status-badge"
              :style="{ background: getBadgeStyle(activity.tag).bg, color: getBadgeStyle(activity.tag).color }"
            >
              {{ activity.target }}
            </span>
          </div>
          <span class="text-[10px] text-[var(--color-third)]">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
