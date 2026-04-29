import type { ColumnKey, KanbanTask, Priority } from './tasks.types'
export { PRIORITY_STYLES as PRIORITY_BADGE } from '~/utils/badges'

export const COLUMNS: { key: ColumnKey; title: string; accent: string }[] = [
  { key: 'todo',       title: 'To Do',      accent: '#a07de0' },
  { key: 'inprogress', title: 'In Progress', accent: '#5f1ee2' },
  { key: 'review',     title: 'Review',      accent: '#f59e0b' },
  { key: 'done',       title: 'Done',        accent: '#22c98a' },
]

export const PRIORITIES: Priority[] = ['High', 'Medium', 'Low']

export const COL_LABELS: Record<ColumnKey, string> = {
  todo:       'To Do',
  inprogress: 'In Progress',
  review:     'Review',
  done:       'Done',
}

export const INITIAL_KANBAN: Record<ColumnKey, KanbanTask[]> = {
  todo: [
    { id: 1, title: 'Research & Analysis', priority: 'High',   assignee: 'Jane Cooper',    due: 'May 20', description: 'Conduct in-depth research on target audience and competitors.' },
    { id: 2, title: 'Create Wireframes',   priority: 'Medium', assignee: 'Esther Howard',  due: 'May 21', description: '' },
    { id: 3, title: 'Competitor Research', priority: 'Low',    assignee: 'Cameron W.',     due: 'May 23', description: '' },
  ],
  inprogress: [
    { id: 4, title: 'UI Design',       priority: 'High',   assignee: 'Brooklyn S.',    due: 'May 16', description: 'Design all key screens following the new brand guidelines.' },
    { id: 5, title: 'Frontend Dev',    priority: 'High',   assignee: 'Kristin Watson', due: 'May 22', description: '' },
    { id: 6, title: 'CMS Integration', priority: 'Medium', assignee: 'Guy Hawkins',    due: 'May 25', description: '' },
  ],
  review: [
    { id: 7, title: 'User Feedback',  priority: 'Medium', assignee: 'Ralph Edwards',  due: 'May 17', description: 'Collect and analyze user feedback from the beta cohort.' },
    { id: 8, title: 'Perf. Testing',  priority: 'Medium', assignee: 'Dianne Russell', due: 'May 19', description: '' },
  ],
  done: [
    { id: 9,  title: 'Project Kickoff',    priority: 'Low', assignee: 'Leslie A.',     due: 'May 10', description: '' },
    { id: 10, title: 'Info Architecture',  priority: 'Low', assignee: 'Theresa Webb',  due: 'May 11', description: '' },
  ],
}
