<script lang="ts" setup>
import type { ProjectProgress } from './dashboard.data'

type Props = {
  projects: ProjectProgress[]
}

defineProps<Props>()
</script>

<template>
  <div class="app-panel p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="app-panel-title">Project Progress</span>
      <span class="app-link-button">All projects -></span>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="project in projects" :key="project.name">
        <div class="mb-1.5 flex items-center justify-between gap-3">
          <span class="truncate text-[13px] font-medium text-[var(--color-text)]">{{ project.name }}</span>
          <div class="flex shrink-0 items-center gap-2.5">
            <span class="text-[11px] text-[var(--color-third)]">{{ project.tasks }} tasks</span>
            <span class="text-[12px] font-bold" :style="{ color: project.color }">{{ project.progress }}%</span>
          </div>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
          <div class="h-full rounded-full" :style="{ width: `${project.progress}%`, background: project.color }" />
        </div>
      </div>
    </div>
  </div>
</template>
