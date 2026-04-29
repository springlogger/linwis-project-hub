export type Priority = 'High' | 'Medium' | 'Low'
export type ColumnKey = 'todo' | 'inprogress' | 'review' | 'done'
export type CardSize = 'compact' | 'default' | 'large'

export interface KanbanTask {
  id: number
  title: string
  priority: Priority
  assignee: string
  due: string
  description: string
}

export interface ModalForm {
  title: string
  priority: Priority
  assignee: string
  due: string
  description: string
  column: ColumnKey
}
