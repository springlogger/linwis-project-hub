<script lang="ts" setup>
import type { KanbanColumn } from './dashboard.data'
import { getAvatarBackground, getAvatarInitials, getBadgeStyle } from './dashboard.helpers'

type Props = {
  columns: KanbanColumn[]
}

defineProps<Props>()
</script>

<template>
  <div class="app-panel p-4">
    <div class="mb-3.5 flex items-center justify-between gap-3">
      <span class="app-panel-title">Tasks Kanban</span>
      <div class="flex gap-2">
        <button type="button" class="app-toolbar-button app-toolbar-button--compact">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          Filter
        </button>
        <button type="button" class="app-toolbar-button app-toolbar-button--compact">
          Group by: Status
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-4">
      <div v-for="column in columns" :key="column.key">
        <div class="mb-2.5 flex items-center gap-1.5">
          <div class="h-2 w-2 shrink-0 rounded-full" :style="{ background: column.accent }" />
          <span class="text-[12px] font-semibold text-[var(--color-text)]">{{ column.title }}</span>
          <span class="rounded-full bg-[var(--color-bg-secondary)] px-1.5 py-px text-[11px] text-[var(--color-third)]">{{ column.count }}</span>
        </div>

        <div class="flex flex-col gap-1.5">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            class="cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2.5 transition-all duration-150 hover:-translate-y-px hover:bg-white/[0.04]"
          >
            <div class="mb-1.5">
              <div class="mb-1 text-[12px] font-medium leading-snug text-[var(--color-text)]">{{ task.title }}</div>
              <span
                class="app-status-badge"
                :style="{ background: getBadgeStyle(task.priority).bg, color: getBadgeStyle(task.priority).color }"
              >
                {{ task.priority }}
              </span>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div class="flex min-w-0 items-center gap-1">
                <div
                  class="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white"
                  :style="{ background: getAvatarBackground(task.assignee) }"
                >
                  {{ getAvatarInitials(task.assignee) }}
                </div>
                <span class="truncate text-[10px] text-[var(--color-third)]">{{ task.assignee.split(' ')[0] }}</span>
              </div>
              <span class="shrink-0 text-[10px] text-[var(--color-third)]">{{ task.due }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
