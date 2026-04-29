<script lang="ts" setup>
import DashboardHeader from '~/features/dashboard/DashboardHeader.vue'
import DashboardMetricGrid from '~/features/dashboard/components/DashboardMetricGrid.vue'
import KanbanBoard from '~/features/dashboard/components/KanbanBoard.vue'
import ProjectProgressPanel from '~/features/dashboard/components/ProjectProgressPanel.vue'
import RecentActivityPanel from '~/features/dashboard/components/RecentActivityPanel.vue'
import TaskBreakdownPanel from '~/features/dashboard/components/TaskBreakdownPanel.vue'
import TimelinePanel from '~/features/dashboard/components/TimelinePanel.vue'
import DashboardInsightsView from '~/features/dashboard/views/DashboardInsightsView.vue'
import DashboardTableView from '~/features/dashboard/views/DashboardTableView.vue'
import DashboardTimelineView from '~/features/dashboard/views/DashboardTimelineView.vue'
import {
  ACTIVITY_ITEMS,
  DASHBOARD_METRICS,
  DASHBOARD_TABS,
  INSIGHT_METRICS,
  INSIGHT_PROJECTS,
  KANBAN_COLUMNS,
  PRIORITY_STYLES,
  PROJECT_PROGRESS_ITEMS,
  RISKS,
  STATUS_STYLES,
  SUGGESTIONS,
  TABLE_FILTERS,
  TABLE_ROWS,
  TABLE_SUMMARY_ITEMS,
  TASK_BREAKDOWN_ITEMS,
  TEAM_LOAD,
  TIMELINE_ACTIVITY_GROUPS,
  TIMELINE_FILTERS,
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

    <div v-if="activeTab === 'Overview'" class="flex flex-col gap-4 p-6 pb-8">
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

    <DashboardTimelineView
      v-else-if="activeTab === 'Timeline'"
      :filters="TIMELINE_FILTERS"
      :groups="TIMELINE_ACTIVITY_GROUPS"
    />

    <DashboardTableView
      v-else-if="activeTab === 'Table'"
      :filters="TABLE_FILTERS"
      :priority-styles="PRIORITY_STYLES"
      :rows="TABLE_ROWS"
      :status-styles="STATUS_STYLES"
      :summary-items="TABLE_SUMMARY_ITEMS"
    />

    <DashboardInsightsView
      v-else-if="activeTab === 'Insights'"
      :metrics="INSIGHT_METRICS"
      :projects="INSIGHT_PROJECTS"
      :risks="RISKS"
      :status-styles="STATUS_STYLES"
      :suggestions="SUGGESTIONS"
      :team-load="TEAM_LOAD"
    />
  </div>
</template>
