<script lang="ts" setup>
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAvatarBackground, getAvatarInitials } from '~/utils/avatar'
import { PRIORITY_STYLES as PRIORITY_BADGE } from '~/utils/badges'
import { COLUMNS, COL_LABELS, PRIORITIES } from '../tasks.data'
import type { ModalForm } from '../tasks.types'

const form = defineModel<ModalForm>({ required: true })

const emit = defineEmits<{
  save: []
  delete: []
  close: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-5 backdrop-blur-[6px]"
    @click.self="emit('close')"
  >
    <div class="flex max-h-[88vh] w-[520px] flex-col overflow-y-auto rounded-[14px] border border-white/10 bg-[var(--color-surface-dropdown)] shadow-[0_28px_80px_rgba(0,0,0,0.75)]">
      <!-- Header -->
      <div class="flex items-start gap-3 border-b border-white/[0.07] px-6 py-5">
        <input
          v-model="form.title"
          class="flex-1 bg-transparent text-[17px] font-bold tracking-[-0.02em] text-[var(--color-text)] focus:outline-none"
        />
        <button
          type="button"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-white/10 bg-transparent text-[var(--color-third)] transition-all duration-150 hover:bg-white/[0.06] hover:text-[var(--color-text)]"
          @click="emit('close')"
        >
          <font-awesome :icon="faXmark" class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex flex-col gap-4 px-6 py-5">
        <div class="grid grid-cols-2 gap-3">
          <!-- Status -->
          <div>
            <div class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-third)]">Status</div>
            <select
              v-model="form.column"
              class="w-full cursor-pointer rounded-lg border border-white/10 bg-[var(--color-bg-secondary)] px-2.5 py-2 text-[12px] text-[var(--color-text)] focus:outline-none"
            >
              <option v-for="c in COLUMNS" :key="c.key" :value="c.key">
                {{ COL_LABELS[c.key] }}
              </option>
            </select>
          </div>

          <!-- Priority -->
          <div>
            <div class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-third)]">Priority</div>
            <select
              v-model="form.priority"
              class="w-full cursor-pointer rounded-lg border bg-[var(--color-bg-secondary)] px-2.5 py-2 text-[12px] font-semibold focus:outline-none"
              :style="{
                color: PRIORITY_BADGE[form.priority]?.color,
                borderColor: `${PRIORITY_BADGE[form.priority]?.color ?? ''}50`,
              }"
            >
              <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <!-- Assignee -->
          <div>
            <div class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-third)]">Assignee</div>
            <div class="flex items-center gap-2 rounded-lg border border-white/10 bg-[var(--color-bg-secondary)] px-2.5 py-1.5">
              <div
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white"
                :style="{ background: getAvatarBackground(form.assignee || 'U') }"
              >
                {{ getAvatarInitials(form.assignee || 'U') }}
              </div>
              <input
                v-model="form.assignee"
                class="w-full bg-transparent text-[12px] text-[var(--color-text)] focus:outline-none"
              />
            </div>
          </div>

          <!-- Due date -->
          <div>
            <div class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-third)]">Due Date</div>
            <input
              v-model="form.due"
              class="w-full rounded-lg border border-white/10 bg-[var(--color-bg-secondary)] px-2.5 py-2 text-[12px] text-[var(--color-text)] focus:outline-none"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <div class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-third)]">Description</div>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Add a description..."
            class="w-full resize-y rounded-lg border border-white/10 bg-[var(--color-bg-secondary)] px-2.5 py-2 text-[12px] leading-relaxed text-[var(--color-text)] placeholder:text-[var(--color-third)] focus:outline-none"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between border-t border-white/[0.07] px-6 py-3.5">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-lg border border-[rgba(239,68,68,0.3)] bg-[var(--color-red-soft)] px-3 py-1.5 text-[12px] font-medium text-[var(--color-red)] transition-all duration-150 hover:bg-[rgba(239,68,68,0.18)]"
          @click="emit('delete')"
        >
          <font-awesome :icon="faTrash" class="h-3 w-3" />
          Delete task
        </button>
        <div class="flex gap-2">
          <button
            type="button"
            class="rounded-lg border border-white/10 bg-transparent px-4 py-1.5 text-[12px] font-medium text-[var(--color-text-light)] transition-all duration-150 hover:bg-white/[0.05]"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] px-5 py-1.5 text-[12px] font-semibold text-white shadow-[0_2px_8px_var(--color-primary-shadow)] transition-all duration-150 hover:-translate-y-px hover:opacity-90 active:translate-y-0"
            @click="emit('save')"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
