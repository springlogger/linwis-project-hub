<script lang="ts" setup>
import type { Metric } from './dashboard.data'
import { getRingParams, getSparklinePoints } from './dashboard.helpers'

type Props = {
  metrics: Metric[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
    <div
      v-for="metric in metrics"
      :key="metric.label"
      class="app-panel p-4"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="mb-1 text-[11px] font-medium text-[var(--color-third)]">{{ metric.label }}</div>
          <div class="mb-1 text-[26px] font-bold leading-none tracking-tight text-[var(--color-text)]">{{ metric.value }}</div>
          <div class="text-[11px] text-[var(--color-third)]">{{ metric.sub }}</div>
        </div>

        <svg v-if="metric.isSpark" width="72" height="32" style="overflow: visible">
          <polyline
            :points="getSparklinePoints(metric.spark)"
            fill="none"
            :stroke="metric.color"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          v-else
          :width="getRingParams(metric.ring).size"
          :height="getRingParams(metric.ring).size"
          style="transform: rotate(-90deg); flex-shrink: 0"
        >
          <circle
            :cx="getRingParams(metric.ring).center"
            :cy="getRingParams(metric.ring).center"
            :r="getRingParams(metric.ring).radius"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            :stroke-width="getRingParams(metric.ring).stroke"
          />
          <circle
            :cx="getRingParams(metric.ring).center"
            :cy="getRingParams(metric.ring).center"
            :r="getRingParams(metric.ring).radius"
            fill="none"
            :stroke="metric.color"
            :stroke-width="getRingParams(metric.ring).stroke"
            :stroke-dasharray="`${getRingParams(metric.ring).dashLength} ${getRingParams(metric.ring).circumference}`"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
