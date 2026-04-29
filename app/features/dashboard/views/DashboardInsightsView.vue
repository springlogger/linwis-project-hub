<script lang="ts" setup>
import type { BadgeStyle, InsightMetric, InsightProject, Risk, Suggestion, TeamMember } from '../dashboard.data'
import { getAvatarBackground, getAvatarInitials } from '../dashboard.helpers'
import { DASHBOARD_ICON_MAP } from '../dashboard.icons'

type Props = {
  metrics: InsightMetric[]
  projects: InsightProject[]
  risks: Risk[]
  statusStyles: Record<string, BadgeStyle>
  suggestions: Suggestion[]
  teamLoad: TeamMember[]
}

defineProps<Props>()

function getRiskColor(level: Risk['level']): string {
  return level === 'high' ? '#ef4444' : '#f59e0b'
}
</script>

<template>
  <div class="flex flex-col gap-4 p-6 pb-8">
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="app-panel flex items-center gap-3 px-4 py-3.5"
      >
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-lg border"
          :style="{ background: `${metric.color}18`, borderColor: `${metric.color}30`, color: metric.color }"
        >
          <font-awesome :icon="DASHBOARD_ICON_MAP[metric.icon]" class="h-4 w-4" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="mb-0.5 text-[11px] font-medium text-[var(--color-third)]">{{ metric.label }}</div>
          <div class="text-xl font-bold tracking-[-0.03em] text-[var(--color-text)]">{{ metric.value }}</div>
          <div class="mt-0.5 text-[10px] text-[var(--color-third)]">{{ metric.sub }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div class="flex flex-col gap-4">
        <div class="app-panel p-4">
          <div class="mb-4 flex items-center justify-between">
            <span class="app-panel-title">Project Health</span>
            <button type="button" class="app-link-button">All projects →</button>
          </div>

          <div class="flex flex-col gap-3.5">
            <div v-for="project in projects" :key="project.name">
              <div class="mb-1.5 flex items-center justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 flex items-center gap-2">
                    <span class="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-[var(--color-text)]">{{ project.name }}</span>
                    <span
                      class="inline-flex shrink-0 items-center whitespace-nowrap rounded px-2 py-[3px] text-[11px] font-semibold"
                      :style="{ background: statusStyles[project.status]?.bg, color: statusStyles[project.status]?.color }"
                    >
                      {{ project.status }}
                    </span>
                  </div>
                  <span class="text-[10px] text-[var(--color-third)]">{{ project.note }}</span>
                </div>
                <span class="shrink-0 text-[13px] font-bold" :style="{ color: project.color }">{{ project.progress }}%</span>
              </div>
              <div class="h-[5px] overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                <div class="h-full rounded-full" :style="{ width: `${project.progress}%`, background: project.color }" />
              </div>
            </div>
          </div>
        </div>

        <div class="app-panel p-4">
          <div class="mb-3.5 flex items-center justify-between">
            <span class="app-panel-title">Risks & Alerts</span>
            <span class="inline-flex items-center rounded bg-[rgba(239,68,68,0.15)] px-2 py-[2px] text-[11px] font-semibold text-[var(--color-red)]">
              {{ risks.length }} active
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <div
              v-for="risk in risks"
              :key="risk.title"
              class="flex items-start gap-2.5 rounded-lg border p-2.5"
              :style="{ background: `${getRiskColor(risk.level)}08`, borderColor: `${getRiskColor(risk.level)}20` }"
            >
              <div
                class="flex size-7 shrink-0 items-center justify-center rounded-lg"
                :style="{ background: `${getRiskColor(risk.level)}18`, color: getRiskColor(risk.level) }"
              >
                <font-awesome :icon="DASHBOARD_ICON_MAP[risk.icon]" class="h-[13px] w-[13px]" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="mb-0.5 text-xs font-semibold text-[var(--color-text)]">{{ risk.title }}</div>
                <div class="text-[11px] text-[var(--color-third)]">{{ risk.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="app-panel p-4">
          <div class="mb-4 flex items-center justify-between">
            <span class="app-panel-title">Team Workload</span>
            <span class="text-[11px] text-[var(--color-third)]">This sprint</span>
          </div>

          <div class="flex flex-col gap-3.5">
            <div v-for="member in teamLoad" :key="member.name">
              <div class="mb-1.5 flex items-center gap-2.5">
                <div
                  class="flex size-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
                  :style="{ background: getAvatarBackground(member.name) }"
                >
                  {{ getAvatarInitials(member.name) }}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 text-xs font-semibold text-[var(--color-text)]">{{ member.name }}</div>
                  <div class="text-[10px] text-[var(--color-third)]">{{ member.role }}</div>
                </div>
                <div class="flex items-center gap-1">
                  <span v-if="member.load >= 85" class="rounded bg-[var(--color-red-soft)] px-1.5 py-px text-[10px] font-semibold text-[var(--color-red)]">
                    Overloaded
                  </span>
                  <span class="text-[13px] font-bold" :style="{ color: member.color }">{{ member.load }}%</span>
                </div>
              </div>
              <div class="h-[5px] overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                <div class="h-full rounded-full" :style="{ width: `${member.load}%`, background: member.color }" />
              </div>
            </div>
          </div>
        </div>

        <div class="app-panel p-4">
          <div class="mb-3.5 flex items-center justify-between">
            <span class="app-panel-title">Suggested Actions</span>
            <span class="rounded bg-[var(--color-bg-secondary)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-third)]">
              {{ suggestions.length }} suggestions
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <div
              v-for="suggestion in suggestions"
              :key="suggestion.title"
              class="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 transition-colors duration-150 hover:border-[var(--color-border-active)]"
            >
              <div
                class="flex size-[30px] shrink-0 items-center justify-center rounded-lg border"
                :style="{ background: `${suggestion.color}18`, borderColor: `${suggestion.color}25`, color: suggestion.color }"
              >
                <font-awesome :icon="DASHBOARD_ICON_MAP[suggestion.icon]" class="h-[13px] w-[13px]" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="mb-0.5 text-xs font-semibold text-[var(--color-text)]">{{ suggestion.title }}</div>
                <div class="text-[11px] text-[var(--color-third)]">{{ suggestion.desc }}</div>
              </div>
              <button type="button" class="app-toolbar-button bg-[var(--color-bg-third)] shrink-0 whitespace-nowrap">
                {{ suggestion.action }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
