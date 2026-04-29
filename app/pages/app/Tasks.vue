<script lang="ts" setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DashboardHeader from '~/features/dashboard/DashboardHeader.vue'
import TaskCard from '~/features/tasks/components/TaskCard.vue'
import TaskModal from '~/features/tasks/components/TaskModal.vue'
import { useTasksStore } from '~/features/tasks/tasks.store'
import { COLUMNS } from '~/features/tasks/tasks.data'
import { useCardSize } from '~/composables/useCardSize'

definePageMeta({
  middleware: ['guest'],
  layout: 'workspace-layout',
})

const {
  kanban,
  filterPriority,
  openTaskId,
  addingIn,
  newTitle,
  dragInfo,
  dragOverCol,
  modalForm,
  totalTasks,
  openTask,
  getFilteredTasks,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onDragLeave,
  openModal,
  saveModal,
  deleteTask,
  addNewTask,
  startAdding,
  confirmAdd,
  cancelAdding,
} = useTasksStore()

const { cardSize, CARD_SIZES } = useCardSize()

const route = useRoute()

watch(() => route.query.task, (val) => {
  if (val) openModal(Number(val))
}, { immediate: true })
</script>

<template>
  <div class="flex h-full min-h-0 flex-col">
    <!-- ── Page header ────────────────────────────────────────────── -->
    <div class="shrink-0">
      <DashboardHeader
        title="Tasks"
        subtitle="Acme Website Redesign · Kanban Board"
        :badge="totalTasks"
      >
        <template #actions>
          <!-- Card size toggle -->
          <div class="flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-0.5">
            <button
              v-for="size in CARD_SIZES"
              :key="size.key"
              type="button"
              :title="size.title"
              class="flex h-6 w-6 items-center justify-center rounded-md transition-all duration-150"
              :class="cardSize === size.key
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-third)] hover:text-[var(--color-text-light)]'"
              @click="cardSize = size.key"
            >
              <font-awesome :icon="size.icon" class="h-3 w-3" />
            </button>
          </div>

          <!-- Priority filter -->
          <div class="flex items-center gap-1.5">
            <button
              v-for="p in (['All', 'High', 'Medium', 'Low'] as const)"
              :key="p"
              type="button"
              class="rounded-md px-2.5 py-1 text-[12px] font-medium transition-all duration-150"
              :class="filterPriority === p
                ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-[0_2px_8px_var(--color-primary-shadow)]'
                : 'border border-[var(--color-border)] text-[var(--color-third)] hover:text-[var(--color-text-light)]'"
              @click="filterPriority = p"
            >
              {{ p }}
            </button>
          </div>

          <!-- Add task -->
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_2px_10px_var(--color-primary-shadow)] transition-all duration-150 hover:-translate-y-px hover:opacity-90 active:translate-y-0"
            @click="addNewTask"
          >
            <font-awesome :icon="faPlus" class="h-3 w-3" />
            Add Task
          </button>
        </template>
      </DashboardHeader>
    </div>

    <!-- ── Kanban board ───────────────────────────────────────────── -->
    <div class="flex min-h-0 flex-1 gap-3.5 overflow-x-auto overflow-y-hidden p-5">
      <div
        v-for="col in COLUMNS"
        :key="col.key"
        class="flex h-full w-[272px] min-w-[272px] flex-col"
        @dragover="onDragOver($event, col.key)"
        @drop="onDrop($event, col.key)"
        @dragleave="onDragLeave($event)"
      >
        <!-- Column header -->
        <div class="mb-2.5 flex items-center justify-between px-0.5">
          <div class="flex items-center gap-1.5">
            <div
              class="h-2 w-2 shrink-0 rounded-full"
              :style="{ background: col.accent, boxShadow: `0 0 7px ${col.accent}70` }"
            />
            <span class="text-[13px] font-bold text-[var(--color-text)]">{{ col.title }}</span>
            <span class="rounded-full bg-[var(--color-bg-secondary)] px-1.5 py-px text-[11px] font-semibold text-[var(--color-third)]">
              {{ kanban[col.key].length }}
            </span>
          </div>
          <button
            type="button"
            class="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-third)] transition-all duration-150 hover:border-[var(--color-border-active-strong)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
            @click="startAdding(col.key)"
          >
            <font-awesome :icon="faPlus" class="h-2.5 w-2.5" />
          </button>
        </div>

        <!-- Drop zone -->
        <div
          class="flex min-h-[200px] flex-1 flex-col gap-2 overflow-y-auto rounded-[10px] border-[1.5px] border-dashed p-2 transition-all duration-150"
          :class="dragOverCol === col.key
            ? 'border-[var(--color-primary)] bg-[rgba(112,69,186,0.07)]'
            : 'border-transparent bg-white/[0.015]'"
        >
          <!-- Task cards -->
          <TaskCard
            v-for="task in getFilteredTasks(col.key)"
            :key="task.id"
            :task="task"
            :card-size="cardSize"
            :is-being-dragged="dragInfo?.taskId === task.id"
            @open="openModal(task.id)"
            @delete="deleteTask(task.id)"
            @dragstart="onDragStart($event, task.id, col.key)"
            @dragend="onDragEnd"
          />

          <!-- Inline add form -->
          <div
            v-if="addingIn === col.key"
            class="shrink-0 rounded-[9px] border-[1.5px] border-[var(--color-border-active)] bg-[var(--color-bg-secondary)] p-2.5"
          >
            <input
              v-model="newTitle"
              autofocus
              placeholder="Task title..."
              class="mb-2 w-full bg-transparent text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-third)] focus:outline-none"
              @keydown.enter="confirmAdd(col.key)"
              @keydown.escape="cancelAdding"
            />
            <div class="flex gap-1.5">
              <button
                type="button"
                class="rounded-md bg-[var(--color-primary)] px-3 py-1 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                @click="confirmAdd(col.key)"
              >
                Add
              </button>
              <button
                type="button"
                class="rounded-md border border-[var(--color-border)] bg-transparent px-2.5 py-1 text-[11px] text-[var(--color-third)] transition-colors hover:text-[var(--color-text-light)]"
                @click="cancelAdding"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Ghost add button -->
          <button
            v-if="addingIn !== col.key"
            type="button"
            class="mt-0.5 flex w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-white/[0.07] bg-transparent py-1.5 text-[12px] text-[#3a3550] transition-all duration-150 hover:border-[var(--color-border-active)] hover:bg-[rgba(112,69,186,0.06)] hover:text-[var(--color-primary)]"
            @click="startAdding(col.key)"
          >
            <font-awesome :icon="faPlus" class="h-2.5 w-2.5" />
            Add task
          </button>
        </div>
      </div>
    </div>

    <!-- ── Task modal ─────────────────────────────────────────────── -->
    <Teleport to="body">
      <TaskModal
        v-if="openTask"
        v-model="modalForm"
        @save="saveModal"
        @delete="deleteTask(openTaskId!)"
        @close="openTaskId = null"
      />
    </Teleport>
  </div>
</template>
