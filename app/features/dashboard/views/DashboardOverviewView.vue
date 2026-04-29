<script lang="ts" setup>
import type { ActivityItem, KanbanColumn, Metric, ProjectProgress, TaskBreakdownItem, TimelineItem } from '../dashboard.data'
import DashboardMetricGrid from '../components/DashboardMetricGrid.vue'
import KanbanBoard from '../components/KanbanBoard.vue'
import ProjectProgressPanel from '../components/ProjectProgressPanel.vue'
import RecentActivityPanel from '../components/RecentActivityPanel.vue'
import TaskBreakdownPanel from '../components/TaskBreakdownPanel.vue'
import TimelinePanel from '../components/TimelinePanel.vue'

type Props = {
  metrics: Metric[]
  kanbanColumns: KanbanColumn[]
  timelineItems: TimelineItem[]
  activityItems: ActivityItem[]
  projectProgress: ProjectProgress[]
  taskBreakdown: TaskBreakdownItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 p-6 pb-8">
    <DashboardMetricGrid :metrics="metrics" />

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <KanbanBoard :columns="kanbanColumns" />

      <div class="flex flex-col gap-4">
        <TimelinePanel :items="timelineItems" />
        <RecentActivityPanel :items="activityItems" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <ProjectProgressPanel :projects="projectProgress" />
      <TaskBreakdownPanel :items="taskBreakdown" />
    </div>
  </div>
</template>
