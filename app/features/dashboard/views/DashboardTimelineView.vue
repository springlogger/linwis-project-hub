<script lang="ts" setup>
import { faEllipsis, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import type { TimelineActivityGroup } from '../dashboard.data'
import { getAvatarBackground, getAvatarInitials } from '../dashboard.helpers'
import { DASHBOARD_ICON_MAP } from '../dashboard.icons'

type Props = {
  filters: readonly string[]
  groups: TimelineActivityGroup[]
}

const props = defineProps<Props>()

const activeFilter = ref<string>(props.filters[0] ?? 'All')
const searchQuery = ref('')

const visibleGroups = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return props.groups
    .map(group => ({
      ...group,
      items: group.items.filter((item) => {
        const matchesFilter = activeFilter.value === 'All' || item.category === activeFilter.value
        const matchesQuery = !normalizedQuery
          || item.user.toLowerCase().includes(normalizedQuery)
          || item.action.toLowerCase().includes(normalizedQuery)
          || item.target.toLowerCase().includes(normalizedQuery)
          || item.sub.toLowerCase().includes(normalizedQuery)

        return matchesFilter && matchesQuery
      }),
    }))
    .filter(group => group.items.length > 0)
})

function isLastVisibleItem(groupIndex: number, itemIndex: number): boolean {
  const group = visibleGroups.value[groupIndex]

  return groupIndex === visibleGroups.value.length - 1 && itemIndex === (group?.items.length ?? 0) - 1
}
</script>

<template>
  <div class="flex flex-col gap-4 p-6 pb-8">
    <div class="flex items-center gap-2.5">
      <label class="flex h-9 w-[16.25rem] shrink-0 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-third)] px-3">
        <font-awesome :icon="faMagnifyingGlass" class="h-[0.8125rem] w-[0.8125rem] shrink-0 text-[var(--color-third)]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search activity..."
          class="w-full bg-transparent text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-third)]"
        />
      </label>

      <div class="flex items-center gap-1.5">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="cursor-pointer rounded-[0.4375rem] px-3.5 py-1.5 text-xs transition-all duration-150"
          :class="activeFilter === filter
            ? 'border-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)] font-semibold text-white shadow-[0_2px_8px_rgba(95,30,226,0.3)]'
            : 'border border-[var(--color-border)] bg-[var(--color-bg-third)] font-normal text-[var(--color-third)]'"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <div class="app-panel overflow-hidden">
      <template v-for="(group, groupIndex) in visibleGroups" :key="group.group">
        <div class="px-5 pb-2.5 pt-3.5">
          <span class="text-[0.8125rem] font-bold text-[var(--color-text)]">{{ group.group }}</span>
        </div>

        <div
          v-for="(item, itemIndex) in group.items"
          :key="`${group.group}-${item.time}-${item.target}`"
          class="flex cursor-default items-center px-5 transition-colors duration-150 hover:bg-white/[0.025]"
          :class="{
            'border-b border-[var(--color-border)]': itemIndex === group.items.length - 1 && groupIndex < visibleGroups.length - 1,
            'border-b border-white/[0.04]': itemIndex < group.items.length - 1,
          }"
        >
          <div class="w-[5.625rem] shrink-0 py-3.5">
            <span class="text-[0.6875rem] tabular-nums text-[var(--color-third)]">{{ item.time }}</span>
          </div>

          <div class="flex w-6 shrink-0 flex-col items-center self-stretch pt-3.5">
            <div class="z-[1] size-2 shrink-0 rounded-full border-2 border-[var(--color-bg-third)] bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary-shadow)]" />
            <div v-if="!isLastVisibleItem(groupIndex, itemIndex)" class="mt-1 w-px flex-1 bg-[var(--color-primary-soft)]" />
          </div>

          <div
            class="m-3 flex size-8 shrink-0 items-center justify-center rounded-lg border"
            :style="{ background: `${item.iconColor}18`, borderColor: `${item.iconColor}30`, color: item.iconColor }"
          >
            <font-awesome :icon="DASHBOARD_ICON_MAP[item.icon]" class="h-3.5 w-3.5" />
          </div>

          <div class="min-w-0 flex-1 py-3.5">
            <div class="flex min-w-0 flex-wrap items-baseline gap-1 leading-[1.5]">
              <span class="whitespace-nowrap text-[0.8125rem] font-semibold text-[var(--color-text)]">{{ item.user }}</span>
              <span class="whitespace-nowrap text-[0.8125rem] text-[var(--color-third)]">{{ item.action }}</span>
              <span class="text-[0.8125rem] font-medium text-[var(--color-text)]">{{ item.target }}</span>
            </div>
            <div class="mt-0.5 text-[0.6875rem]" :class="item.subLink ? 'text-[var(--color-primary)]' : 'text-[var(--color-third)]'">
              {{ item.sub }}
            </div>
          </div>

          <div class="flex shrink-0 items-center gap-2">
            <div
              class="flex size-7 shrink-0 items-center justify-center rounded-full text-[0.65625rem] font-semibold text-white"
              :style="{ background: getAvatarBackground(item.user) }"
            >
              {{ getAvatarInitials(item.user) }}
            </div>
            <button type="button" class="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--color-third)] hover:text-[var(--color-text-light)]">
              <font-awesome :icon="faEllipsis" class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </template>

      <div v-if="visibleGroups.length === 0" class="px-5 py-8 text-center text-xs text-[var(--color-third)]">
        No activity found.
      </div>
    </div>
  </div>
</template>
