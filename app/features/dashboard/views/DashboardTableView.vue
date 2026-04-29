<script lang="ts" setup>
import { faChevronDown, faChevronLeft, faChevronRight, faEllipsis, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import type { BadgeStyle, TableRow, TableSummaryItem } from '../dashboard.data'
import { getAvatarBackground, getAvatarInitials, getProgressColor } from '../dashboard.helpers'
import { DASHBOARD_ICON_MAP } from '../dashboard.icons'

type Props = {
  filters: readonly string[]
  priorityStyles: Record<string, BadgeStyle>
  rows: TableRow[]
  statusStyles: Record<string, BadgeStyle>
  summaryItems: TableSummaryItem[]
}

const props = defineProps<Props>()

const activeFilter = ref<string>(props.filters[0] ?? 'All')
const searchQuery = ref('')

const tableColumns = ['Name', 'Type', 'Owner', 'Status', 'Priority', 'Progress', 'Due Date', 'Last Update', '']
const pageControls = ['previous', '1', '2', '3', '...', '8', 'next'] as const

const visibleRows = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return props.rows.filter((row) => {
    const matchesSearch = !normalizedQuery
      || row.name.toLowerCase().includes(normalizedQuery)
      || row.owner.toLowerCase().includes(normalizedQuery)

    const matchesFilter = activeFilter.value === 'All'
      || (activeFilter.value === 'Projects' && row.type === 'Project')
      || (activeFilter.value === 'Tasks' && row.type === 'Task')
      || (activeFilter.value === 'High Priority' && row.priority === 'High')
      || (activeFilter.value === 'Overdue' && row.status === 'Overdue')

    return matchesSearch && matchesFilter
  })
})

function getRowTypeStyle(type: TableRow['type']): BadgeStyle {
  if (type === 'Project') {
    return { bg: 'rgba(112,69,186,0.2)', color: '#a07de0' }
  }

  return { bg: 'rgba(95,30,226,0.15)', color: '#9b6cf7' }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-6 pb-8">
    <div class="grid grid-cols-4 gap-3">
      <div
        v-for="item in summaryItems"
        :key="item.label"
          class="app-panel flex items-center gap-3 px-4 py-3.5"
        >
        <div
          class="flex size-9 shrink-0 items-center justify-center rounded-[9px] border"
          :style="{ background: `${item.color}18`, borderColor: `${item.color}30`, color: item.color }"
        >
          <font-awesome :icon="DASHBOARD_ICON_MAP[item.icon]" class="h-4 w-4" />
        </div>
        <div>
          <div class="mb-0.5 text-[11px] font-medium text-[var(--color-third)]">{{ item.label }}</div>
          <div class="text-[22px] font-bold tracking-[-0.04em] text-[var(--color-text)]">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2.5">
      <label class="flex h-9 w-[260px] shrink-0 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-third)] px-3">
        <font-awesome :icon="faMagnifyingGlass" class="h-[13px] w-[13px] shrink-0 text-[var(--color-third)]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search projects or tasks..."
          class="w-full bg-transparent text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-third)]"
        />
      </label>

      <div class="flex flex-1 items-center gap-1.5">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="cursor-pointer rounded-[7px] px-3 py-1.5 text-xs transition-all duration-150"
          :class="activeFilter === filter
            ? 'border-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] font-semibold text-white shadow-[0_2px_8px_rgba(95,30,226,0.3)]'
            : 'border border-[var(--color-border)] bg-[var(--color-bg-third)] font-normal text-[var(--color-third)]'"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <button type="button" class="app-toolbar-button bg-[var(--color-bg-third)] text-[var(--color-third)] shrink-0 rounded-[7px]">
        Sort by: Due date
        <font-awesome :icon="faChevronDown" class="h-3 w-3" />
      </button>
    </div>

    <div class="app-panel overflow-hidden">
      <div class="grid grid-cols-[2fr_90px_140px_110px_90px_150px_90px_100px_40px] items-center border-b border-[var(--color-border)] bg-white/[0.02] px-5 py-2.5">
        <div
          v-for="column in tableColumns"
          :key="column"
          class="pr-2 text-[10px] font-bold uppercase tracking-[0.07em] text-[var(--color-third)]"
        >
          {{ column }}
        </div>
      </div>

      <div
        v-for="(row, rowIndex) in visibleRows"
        :key="`${row.type}-${row.name}`"
        class="grid grid-cols-[2fr_90px_140px_110px_90px_150px_90px_100px_40px] cursor-default items-center px-5 py-[13px] transition-colors duration-150 hover:bg-white/[0.025]"
        :class="{ 'border-b border-white/[0.04]': rowIndex < visibleRows.length - 1 }"
      >
            <div class="flex min-w-0 items-center gap-2">
              <div class="size-1.5 shrink-0 rounded-full" :style="{ background: row.type === 'Project' ? 'var(--color-primary)' : 'var(--color-purple-soft)' }" />
              <span class="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-[var(--color-text)]">{{ row.name }}</span>
            </div>

            <div>
              <span
                class="inline-flex items-center whitespace-nowrap rounded px-2 py-[3px] text-[11px] font-semibold"
                :style="{ background: getRowTypeStyle(row.type).bg, color: getRowTypeStyle(row.type).color }"
              >
                {{ row.type }}
              </span>
            </div>

            <div class="flex items-center gap-[7px]">
              <div
                class="flex size-5 shrink-0 items-center justify-center rounded-full text-[7.5px] font-semibold text-white"
                :style="{ background: getAvatarBackground(row.owner) }"
              >
                {{ getAvatarInitials(row.owner) }}
              </div>
              <span class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[var(--color-text-light)]">{{ row.owner.split(' ')[0] }}</span>
            </div>

            <div>
              <span
                class="inline-flex items-center whitespace-nowrap rounded px-2 py-[3px] text-[11px] font-semibold"
                :style="{ background: statusStyles[row.status]?.bg, color: statusStyles[row.status]?.color }"
              >
                {{ row.status }}
              </span>
            </div>

            <div>
              <span
                class="inline-flex items-center whitespace-nowrap rounded px-2 py-[3px] text-[11px] font-semibold"
                :style="{ background: priorityStyles[row.priority]?.bg, color: priorityStyles[row.priority]?.color }"
              >
                {{ row.priority }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <div class="h-[5px] flex-1 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                <div class="h-full rounded-full" :style="{ width: `${row.progress}%`, background: getProgressColor(row.progress) }" />
              </div>
              <span class="w-7 shrink-0 text-right text-[11px] font-semibold text-[var(--color-text-light)]">{{ row.progress }}%</span>
            </div>

            <div class="text-xs" :class="row.status === 'Overdue' ? 'text-[var(--color-red)]' : 'text-[var(--color-text-light)]'">
              {{ row.due }}
            </div>

            <div class="text-[11px] text-[var(--color-third)]">{{ row.updated }}</div>

            <div class="flex justify-center">
              <button type="button" class="flex size-[26px] cursor-pointer items-center justify-center rounded-md text-[var(--color-third)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-light)]">
                <font-awesome :icon="faEllipsis" class="h-3.5 w-3.5" />
              </button>
            </div>
      </div>

      <div class="flex items-center justify-between border-t border-[var(--color-border)] bg-white/[0.01] px-5 py-3">
        <span class="text-xs text-[var(--color-third)]">Showing 1–{{ visibleRows.length }} of 48</span>
        <div class="flex items-center gap-1">
          <button
            v-for="control in pageControls"
            :key="control"
            type="button"
            class="flex size-7 cursor-pointer items-center justify-center rounded-md text-xs transition-all duration-150"
            :class="control === '1'
              ? 'bg-[var(--color-primary)] text-white'
              : 'border border-[var(--color-border)] bg-transparent text-[var(--color-third)] hover:text-[var(--color-text-light)]'"
          >
            <font-awesome v-if="control === 'previous'" :icon="faChevronLeft" class="h-3 w-3" />
            <font-awesome v-else-if="control === 'next'" :icon="faChevronRight" class="h-3 w-3" />
            <span v-else>{{ control }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
