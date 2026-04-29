<script lang="ts" setup>
import { faCalendarDays, faGripVertical, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAvatarBackground, getAvatarInitials } from '~/utils/avatar'
import { PRIORITY_STYLES as PRIORITY_BADGE } from '~/utils/badges'
import type { CardSize, KanbanTask } from '../tasks.types'

type Props = {
  task: KanbanTask
  cardSize: CardSize
  isBeingDragged: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  open: []
  delete: []
  dragstart: [e: DragEvent]
  dragend: []
}>()
</script>

<template>
  <div
    draggable="true"
    class="group relative cursor-grab select-none rounded-[9px] border transition-all duration-150"
    :class="[
      isBeingDragged
        ? 'border-dashed border-[rgba(112,69,186,0.5)] bg-[rgba(112,69,186,0.12)] opacity-50'
        : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-active)] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.35)]',
      cardSize === 'compact' ? 'p-2' : 'p-2.5',
    ]"
    @dragstart="emit('dragstart', $event)"
    @dragend="emit('dragend')"
    @click="emit('open')"
  >
    <!-- Compact: absolute delete -->
    <button
      v-if="cardSize === 'compact'"
      type="button"
      class="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded bg-transparent p-0 text-[var(--color-bg-third)] opacity-0 transition-all duration-150 group-hover:opacity-100 hover:!bg-[rgba(239,68,68,0.15)] hover:!text-[var(--color-red)]"
      @click.stop="emit('delete')"
    >
      <font-awesome :icon="faXmark" class="h-2.5 w-2.5" />
    </button>

    <!-- Default/Large: grip + delete row -->
    <div v-else class="mb-1.5 flex items-center justify-between">
      <font-awesome :icon="faGripVertical" class="h-3 w-3 text-[var(--color-bg-third)]" />
      <button
        type="button"
        class="flex h-4 w-4 items-center justify-center rounded bg-transparent p-0 text-[var(--color-bg-third)] opacity-0 transition-all duration-150 group-hover:opacity-100 hover:!bg-[rgba(239,68,68,0.15)] hover:!text-[var(--color-red)]"
        @click.stop="emit('delete')"
      >
        <font-awesome :icon="faXmark" class="h-2.5 w-2.5" />
      </button>
    </div>

    <!-- Title -->
    <div
      class="font-medium leading-snug text-[var(--color-text)]"
      :class="cardSize === 'compact'
        ? 'mb-1 pr-5 text-[11px]'
        : cardSize === 'large' ? 'mb-1.5 text-[13px]' : 'mb-1.5 text-[12px]'"
    >
      {{ task.title }}
    </div>

    <!-- Description (large only) -->
    <p
      v-if="cardSize === 'large' && task.description"
      class="mb-1.5 line-clamp-2 text-[11px] leading-relaxed text-[var(--color-third)]"
    >
      {{ task.description }}
    </p>

    <!-- Priority badge -->
    <div :class="cardSize === 'compact' ? 'mb-1' : 'mb-1.5'">
      <span
        class="inline-flex items-center rounded px-1.5 py-px text-[10px] font-semibold capitalize tracking-wide"
        :style="{ background: PRIORITY_BADGE[task.priority]?.bg, color: PRIORITY_BADGE[task.priority]?.color }"
      >
        {{ task.priority }}
      </span>
    </div>

    <!-- Assignee + due date -->
    <div class="flex items-center justify-between">
      <div class="flex min-w-0 items-center gap-1">
        <div
          class="shrink-0 items-center justify-center rounded-full font-semibold text-white"
          :class="cardSize === 'compact'
            ? 'flex h-[14px] w-[14px] text-[5px]'
            : 'flex h-[18px] w-[18px] text-[7px]'"
          :style="{ background: getAvatarBackground(task.assignee) }"
        >
          {{ getAvatarInitials(task.assignee) }}
        </div>
        <span
          class="truncate text-[var(--color-third)]"
          :class="cardSize === 'compact' ? 'text-[9px]' : 'text-[10px]'"
        >
          {{ task.assignee.split(' ')[0] }}
        </span>
      </div>
      <div class="flex shrink-0 items-center gap-1">
        <font-awesome
          :icon="faCalendarDays"
          class="text-[var(--color-third)]"
          :class="cardSize === 'compact' ? 'h-[9px] w-[9px]' : 'h-[10px] w-[10px]'"
        />
        <span
          class="text-[var(--color-third)]"
          :class="cardSize === 'compact' ? 'text-[9px]' : 'text-[10px]'"
        >
          {{ task.due }}
        </span>
      </div>
    </div>
  </div>
</template>
