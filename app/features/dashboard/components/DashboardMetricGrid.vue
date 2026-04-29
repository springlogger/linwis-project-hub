<script lang="ts" setup>
import type { Metric } from '../dashboard.data'
import { getRingParams, getSparklinePoints } from '../dashboard.helpers'

type Props = {
  metrics: Metric[]
}

const props = defineProps<Props>()

const ringParamsList = computed(() => props.metrics.map(m => getRingParams(m.ring)))
</script>

<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
    <div
      v-for="(metric, i) in metrics"
      :key="metric.label"
      class="app-panel p-4"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="mb-1 text-[0.6875rem] font-medium text-[var(--color-third)]">{{ metric.label }}</div>
          <div class="mb-1 text-[1.625rem] font-bold leading-none tracking-tight text-[var(--color-text)]">{{ metric.value }}</div>
          <div class="text-[0.6875rem] text-[var(--color-third)]">{{ metric.sub }}</div>
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
          :width="ringParamsList[i]!.size"
          :height="ringParamsList[i]!.size"
          style="transform: rotate(-90deg); flex-shrink: 0"
        >
          <circle
            :cx="ringParamsList[i]!.center"
            :cy="ringParamsList[i]!.center"
            :r="ringParamsList[i]!.radius"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            :stroke-width="ringParamsList[i]!.stroke"
          />
          <circle
            :cx="ringParamsList[i]!.center"
            :cy="ringParamsList[i]!.center"
            :r="ringParamsList[i]!.radius"
            fill="none"
            :stroke="metric.color"
            :stroke-width="ringParamsList[i]!.stroke"
            :stroke-dasharray="`${ringParamsList[i]!.dashLength} ${ringParamsList[i]!.circumference}`"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
