import { defineStore } from 'pinia'
import { INITIAL_KANBAN } from './tasks.data'
import type { ColumnKey, KanbanTask, ModalForm, Priority } from './tasks.types'

export const useTasksStore = defineStore('tasks', () => {
  const kanban = ref<Record<ColumnKey, KanbanTask[]>>(
    structuredClone(INITIAL_KANBAN),
  )

  const filterPriority = ref<Priority | 'All'>('All')
  const openTaskId = ref<number | null>(null)
  const addingIn = ref<ColumnKey | null>(null)
  const newTitle = ref('')
  const dragInfo = ref<{ taskId: number; fromCol: ColumnKey } | null>(null)
  const dragOverCol = ref<ColumnKey | null>(null)

  const modalForm = ref<ModalForm>({
    title: '',
    priority: 'Medium',
    assignee: '',
    due: '',
    description: '',
    column: 'todo',
  })

  const totalTasks = computed(() =>
    Object.values(kanban.value).reduce((sum, col) => sum + col.length, 0),
  )

  const openTask = computed(() =>
    openTaskId.value !== null ? findTask(openTaskId.value) : null,
  )

  function findTask(id: number): KanbanTask | null {
    for (const col of Object.values(kanban.value)) {
      const task = col.find(t => t.id === id)
      if (task) return { ...task }
    }
    return null
  }

  function findCol(id: number): ColumnKey | null {
    for (const [key, col] of Object.entries(kanban.value)) {
      if (col.find(t => t.id === id)) return key as ColumnKey
    }
    return null
  }

  function getFilteredTasks(colKey: ColumnKey): KanbanTask[] {
    const tasks = kanban.value[colKey]
    return filterPriority.value === 'All'
      ? tasks
      : tasks.filter(t => t.priority === filterPriority.value)
  }

  // ── Drag & Drop ──────────────────────────────────────────────────────

  function onDragStart(e: DragEvent, taskId: number, fromCol: ColumnKey) {
    dragInfo.value = { taskId, fromCol }
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
  }

  function onDragOver(e: DragEvent, colKey: ColumnKey) {
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
    dragOverCol.value = colKey
  }

  function onDrop(e: DragEvent, toCol: ColumnKey) {
    e.preventDefault()
    if (!dragInfo.value) return
    const { taskId, fromCol } = dragInfo.value
    if (fromCol !== toCol) {
      const task = kanban.value[fromCol].find(t => t.id === taskId)
      if (!task) return
      kanban.value[fromCol] = kanban.value[fromCol].filter(t => t.id !== taskId)
      kanban.value[toCol] = [...kanban.value[toCol], task]
    }
    dragInfo.value = null
    dragOverCol.value = null
  }

  function onDragEnd() {
    dragInfo.value = null
    dragOverCol.value = null
  }

  function onDragLeave(e: DragEvent) {
    const el = e.currentTarget as HTMLElement
    if (!el.contains(e.relatedTarget as Node)) {
      dragOverCol.value = null
    }
  }

  // ── Task CRUD ────────────────────────────────────────────────────────

  function openModal(taskId: number) {
    const task = findTask(taskId)
    const col = findCol(taskId)
    if (!task || !col) return
    openTaskId.value = taskId
    modalForm.value = {
      title: task.title,
      priority: task.priority,
      assignee: task.assignee,
      due: task.due,
      description: task.description,
      column: col,
    }
  }

  function saveModal() {
    if (!openTaskId.value) return
    const fromCol = findCol(openTaskId.value)
    if (!fromCol) return
    const updated: KanbanTask = {
      id: openTaskId.value,
      title: modalForm.value.title,
      priority: modalForm.value.priority,
      assignee: modalForm.value.assignee,
      due: modalForm.value.due,
      description: modalForm.value.description,
    }
    const toCol = modalForm.value.column
    if (fromCol === toCol) {
      kanban.value[fromCol] = kanban.value[fromCol].map(t =>
        t.id === openTaskId.value ? updated : t,
      )
    }
    else {
      kanban.value[fromCol] = kanban.value[fromCol].filter(t => t.id !== openTaskId.value)
      kanban.value[toCol] = [...kanban.value[toCol], updated]
    }
    openTaskId.value = null
  }

  function deleteTask(taskId: number) {
    const col = findCol(taskId)
    if (!col) return
    kanban.value[col] = kanban.value[col].filter(t => t.id !== taskId)
    if (openTaskId.value === taskId) openTaskId.value = null
  }

  function addNewTask() {
    const id = Date.now()
    kanban.value.todo = [
      ...kanban.value.todo,
      { id, title: 'New Task', priority: 'Medium', assignee: 'Unassigned', due: 'TBD', description: '' },
    ]
    openModal(id)
  }

  // ── Inline add ───────────────────────────────────────────────────────

  function startAdding(colKey: ColumnKey) {
    addingIn.value = colKey
    newTitle.value = ''
  }

  function confirmAdd(colKey: ColumnKey) {
    if (!newTitle.value.trim()) {
      addingIn.value = null
      return
    }
    kanban.value[colKey] = [
      ...kanban.value[colKey],
      { id: Date.now(), title: newTitle.value.trim(), priority: 'Medium', assignee: 'Unassigned', due: 'TBD', description: '' },
    ]
    newTitle.value = ''
    addingIn.value = null
  }

  function cancelAdding() {
    addingIn.value = null
    newTitle.value = ''
  }

  return {
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
  }
})
