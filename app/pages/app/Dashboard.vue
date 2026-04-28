<script lang="ts" setup>
import DashboardHeader from '~/features/dashboard/DashboardHeader.vue'
import DashboardMetricGrid from '~/features/dashboard/DashboardMetricGrid.vue'
import KanbanBoard from '~/features/dashboard/KanbanBoard.vue'
import ProjectProgressPanel from '~/features/dashboard/ProjectProgressPanel.vue'
import RecentActivityPanel from '~/features/dashboard/RecentActivityPanel.vue'
import TaskBreakdownPanel from '~/features/dashboard/TaskBreakdownPanel.vue'
import TimelinePanel from '~/features/dashboard/TimelinePanel.vue'
import {
  ACTIVITY_ITEMS,
  DASHBOARD_METRICS,
  DASHBOARD_TABS,
  KANBAN_COLUMNS,
  PROJECT_PROGRESS_ITEMS,
  TASK_BREAKDOWN_ITEMS,
  TIMELINE_ITEMS,
} from '~/features/dashboard/dashboard.data'

definePageMeta({
  middleware: ['guest'],
  layout: 'workspace-layout',
})

const activeTab = ref<string>(DASHBOARD_TABS[0])
</script>

<template>
  <div class="flex min-h-full flex-col">
    <DashboardHeader v-model:active-tab="activeTab" :tabs="DASHBOARD_TABS" />

    <div class="flex flex-col gap-4 p-6 pb-8">
      <DashboardMetricGrid :metrics="DASHBOARD_METRICS" />

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <KanbanBoard :columns="KANBAN_COLUMNS" />

        <div class="flex flex-col gap-4">
          <TimelinePanel :items="TIMELINE_ITEMS" />
          <RecentActivityPanel :items="ACTIVITY_ITEMS" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProjectProgressPanel :projects="PROJECT_PROGRESS_ITEMS" />
        <TaskBreakdownPanel :items="TASK_BREAKDOWN_ITEMS" />
      </div>
    </div>
  </div>
</template>
