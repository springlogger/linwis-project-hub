export type Metric = {
  label: string
  value: string
  sub: string
  ring: number
  color: string
  spark: number[]
  isSpark: boolean
}

export type KanbanTask = {
  id: number
  title: string
  priority: string
  assignee: string
  due: string
}

export type KanbanColumn = {
  key: string
  title: string
  count: number
  accent: string
  tasks: KanbanTask[]
}

export type TimelineItem = {
  name: string
  start: number
  width: number
  color: string
}

export type ActivityItem = {
  user: string
  action: string
  target: string
  tag: string
  time: string
}

export type ProjectProgress = {
  name: string
  progress: number
  tasks: number
  color: string
}

export type TaskBreakdownItem = {
  label: string
  count: number
  pct: string
  pctVal: number
  color: string
}

export type BadgeStyle = {
  bg: string
  color: string
}

export const DEFAULT_BADGE_STYLE: BadgeStyle = { bg: 'rgba(112,69,186,0.2)', color: '#a07de0' }

export const DASHBOARD_TABS = ['Overview', 'Tasks', 'Timeline', 'Files', 'Team', 'Settings'] as const

export const DASHBOARD_METRICS: Metric[] = [
  { label: 'Tasks', value: '42', sub: 'Total tasks', ring: 100, color: '#7045ba', spark: [20, 25, 22, 30, 28, 35, 42], isSpark: false },
  { label: 'In Progress', value: '16', sub: '38% of total', ring: 38, color: '#5f1ee2', spark: [8, 10, 12, 14, 13, 15, 16], isSpark: false },
  { label: 'Completed', value: '24', sub: '57% of total', ring: 57, color: '#22c98a', spark: [5, 8, 12, 16, 18, 22, 24], isSpark: false },
  { label: 'Overdue', value: '2', sub: '5% of total', ring: 5, color: '#ef4444', spark: [0, 1, 1, 2, 1, 2, 2], isSpark: false },
  { label: 'Progress', value: '57%', sub: 'Project completion', ring: 57, color: '#a07de0', spark: [20, 28, 34, 40, 45, 52, 57], isSpark: true },
]

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    key: 'todo',
    title: 'To Do',
    count: 12,
    accent: '#a07de0',
    tasks: [
      { id: 1, title: 'Research & Analysis', priority: 'High', assignee: 'Jane Cooper', due: 'May 20' },
      { id: 2, title: 'Create Wireframes', priority: 'Medium', assignee: 'Esther Howard', due: 'May 21' },
      { id: 3, title: 'Competitor Research', priority: 'Low', assignee: 'Cameron W.', due: 'May 23' },
    ],
  },
  {
    key: 'inprogress',
    title: 'In Progress',
    count: 16,
    accent: '#5f1ee2',
    tasks: [
      { id: 4, title: 'UI Design', priority: 'High', assignee: 'Brooklyn S.', due: 'May 16' },
      { id: 5, title: 'Frontend Dev', priority: 'High', assignee: 'Kristin Watson', due: 'May 22' },
      { id: 6, title: 'CMS Integration', priority: 'Medium', assignee: 'Guy Hawkins', due: 'May 25' },
    ],
  },
  {
    key: 'review',
    title: 'Review',
    count: 6,
    accent: '#f59e0b',
    tasks: [
      { id: 7, title: 'User Feedback', priority: 'Medium', assignee: 'Ralph Edwards', due: 'May 17' },
      { id: 8, title: 'Perf. Testing', priority: 'Medium', assignee: 'Dianne Russell', due: 'May 19' },
    ],
  },
  {
    key: 'done',
    title: 'Done',
    count: 8,
    accent: '#22c98a',
    tasks: [
      { id: 9, title: 'Project Kickoff', priority: 'Low', assignee: 'Leslie A.', due: 'May 10' },
      { id: 10, title: 'Info Architecture', priority: 'Low', assignee: 'Theresa Webb', due: 'May 11' },
    ],
  },
]

export const TIMELINE_ITEMS: TimelineItem[] = [
  { name: 'Research & Analysis', start: 0, width: 28, color: '#7045ba' },
  { name: 'UI Design', start: 15, width: 36, color: '#5f1ee2' },
  { name: 'Frontend Dev', start: 28, width: 40, color: '#441f8e' },
  { name: 'CMS Integration', start: 40, width: 30, color: '#7045ba' },
  { name: 'Testing', start: 58, width: 22, color: '#3b5fe2' },
  { name: 'Launch', start: 78, width: 18, color: '#5f1ee2' },
]

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { user: 'Kristin Watson', action: 'completed', target: 'UI Design', tag: 'completed', time: '2h ago' },
  { user: 'Brooklyn Simmons', action: 'moved to', target: 'In Progress', tag: 'in progress', time: '3h ago' },
  { user: 'Ralph Edwards', action: 'commented on', target: 'User Feedback', tag: 'review', time: '5h ago' },
  { user: 'Jane Cooper', action: 'created', target: 'Content Strategy', tag: 'default', time: '1d ago' },
]

export const PROJECT_PROGRESS_ITEMS: ProjectProgress[] = [
  { name: 'Acme Website Redesign', progress: 57, tasks: 42, color: '#7045ba' },
  { name: 'Mobile App MVP', progress: 34, tasks: 28, color: '#5f1ee2' },
  { name: 'Brand Identity', progress: 81, tasks: 15, color: '#22c98a' },
]

export const TASK_BREAKDOWN_ITEMS: TaskBreakdownItem[] = [
  { label: 'To Do', count: 12, pct: '28%', pctVal: 28, color: '#a07de0' },
  { label: 'In Progress', count: 16, pct: '38%', pctVal: 38, color: '#5f1ee2' },
  { label: 'Review', count: 6, pct: '14%', pctVal: 14, color: '#f59e0b' },
  { label: 'Done', count: 8, pct: '20%', pctVal: 20, color: '#22c98a' },
]

export const BADGE_STYLES: Record<string, BadgeStyle> = {
  high: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  medium: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  low: { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  completed: { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  'in progress': { bg: 'rgba(95,30,226,0.2)', color: '#9b6cf7' },
  review: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  default: DEFAULT_BADGE_STYLE,
}

export const AVATAR_PALETTE = ['#7045ba', '#5f1ee2', '#441f8e', '#3b5fe2', '#1e7a8e'] as const
