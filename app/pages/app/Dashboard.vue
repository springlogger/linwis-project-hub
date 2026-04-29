<script lang="ts" setup>
import { faCalendarDays, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DashboardHeader from '~/features/dashboard/DashboardHeader.vue'
import DashboardInsightsView from '~/features/dashboard/views/DashboardInsightsView.vue'
import DashboardOverviewView from '~/features/dashboard/views/DashboardOverviewView.vue'
import DashboardTableView from '~/features/dashboard/views/DashboardTableView.vue'
import DashboardTimelineView from '~/features/dashboard/views/DashboardTimelineView.vue'
import {
  ACTIVITY_ITEMS,
  DASHBOARD_METRICS,
  DASHBOARD_TABS,
  INSIGHT_METRICS,
  INSIGHT_PROJECTS,
  KANBAN_COLUMNS,
  PROJECT_PROGRESS_ITEMS,
  RISKS,
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
import { PRIORITY_STYLES, STATUS_STYLES } from '~/utils/badges'

definePageMeta({
  middleware: ['guest'],
  layout: 'workspace-layout',
})

const activeTab = ref<string>(DASHBOARD_TABS[0])
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="shrink-0">
      <DashboardHeader
        v-model:active-tab="activeTab"
        title="Acme Website Redesign"
        subtitle="Redesigning the corporate website with a focus on UX and performance."
        :tabs="DASHBOARD_TABS"
        :starred="true"
      >
        <template #actions>
          <button type="button" class="app-toolbar-button">
            <font-awesome :icon="faCalendarDays" class="h-[0.8125rem] w-[0.8125rem]" />
            May 12 - May 18, 2024
            <font-awesome :icon="faChevronDown" class="h-3 w-3" />
          </button>
        </template>
      </DashboardHeader>
    </div>

    <div class="min-h-0 flex-1 overflow-auto">
      <DashboardOverviewView
        v-if="activeTab === 'Overview'"
        :activity-items="ACTIVITY_ITEMS"
        :kanban-columns="KANBAN_COLUMNS"
        :metrics="DASHBOARD_METRICS"
        :project-progress="PROJECT_PROGRESS_ITEMS"
        :task-breakdown="TASK_BREAKDOWN_ITEMS"
        :timeline-items="TIMELINE_ITEMS"
      />

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
  </div>
</template>
