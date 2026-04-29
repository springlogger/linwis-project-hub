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

export type DashboardIconKey =
  | 'activity'
  | 'alert'
  | 'bolt'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'clock'
  | 'comment'
  | 'file'
  | 'folder'
  | 'layers'
  | 'move'
  | 'taskList'
  | 'team'
  | 'userPlus'
  | 'xmark'

export type TimelineActivityItem = {
  time: string
  user: string
  action: string
  target: string
  sub: string
  subLink: boolean
  icon: DashboardIconKey
  iconColor: string
  category: 'Projects' | 'Tasks' | 'Team' | 'Comments'
}

export type TimelineActivityGroup = {
  group: string
  items: TimelineActivityItem[]
}

export type TableRow = {
  name: string
  type: 'Project' | 'Task'
  owner: string
  status: string
  priority: string
  progress: number
  due: string
  updated: string
}

export type TableSummaryItem = {
  label: string
  value: string
  icon: DashboardIconKey
  color: string
}

export type InsightMetric = {
  label: string
  value: string
  sub: string
  color: string
  icon: DashboardIconKey
}

export type InsightProject = {
  name: string
  status: string
  progress: number
  note: string
  color: string
}

export type Risk = {
  title: string
  desc: string
  level: 'high' | 'medium'
  icon: DashboardIconKey
}

export type TeamMember = {
  name: string
  role: string
  load: number
  color: string
}

export type Suggestion = {
  icon: DashboardIconKey
  title: string
  desc: string
  action: string
  color: string
}

export const DEFAULT_BADGE_STYLE: BadgeStyle = { bg: 'rgba(112,69,186,0.2)', color: '#a07de0' }
export const DASHBOARD_TABS = ['Overview', 'Timeline', 'Table', 'Insights'] as const
export const TIMELINE_FILTERS = ['All', 'Projects', 'Tasks', 'Team', 'Comments'] as const
export const TABLE_FILTERS = ['All', 'Projects', 'Tasks', 'High Priority', 'Overdue'] as const

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

export const STATUS_STYLES: Record<string, BadgeStyle> = {
  Active: { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  Review: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  Planning: { bg: 'rgba(112,69,186,0.2)', color: '#a07de0' },
  Overdue: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  'At Risk': { bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
  'In Progress': { bg: 'rgba(95,30,226,0.2)', color: '#9b6cf7' },
  Healthy: { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  'Needs Attention': { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
}

export const PRIORITY_STYLES: Record<string, BadgeStyle> = {
  High: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  Medium: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  Low: { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
}

export const AVATAR_PALETTE = ['#7045ba', '#5f1ee2', '#441f8e', '#3b5fe2', '#1e7a8e'] as const

export const TIMELINE_ACTIVITY_GROUPS: TimelineActivityGroup[] = [
  {
    group: 'Today',
    items: [
      { time: '10:42 AM', user: 'Kristin Watson', action: 'completed task', target: '"Design dashboard header"', sub: 'In project Website Redesign', subLink: true, icon: 'check', iconColor: '#22c98a', category: 'Tasks' },
      { time: '09:15 AM', user: 'Brooklyn Simmons', action: 'created project', target: '"Mobile App MVP"', sub: 'No description provided', subLink: false, icon: 'folder', iconColor: '#7045ba', category: 'Projects' },
      { time: '08:30 AM', user: 'Jane Cooper', action: 'was invited to', target: 'the workspace', sub: 'Invitation sent by John Smith', subLink: false, icon: 'userPlus', iconColor: '#5f1ee2', category: 'Team' },
    ],
  },
  {
    group: 'Yesterday',
    items: [
      { time: '04:45 PM', user: 'Ralph Edwards', action: 'moved task', target: '"Auth API" to Review', sub: 'In project Backend Services', subLink: true, icon: 'move', iconColor: '#3b82f6', category: 'Tasks' },
      { time: '03:20 PM', user: 'Dianne Russell', action: 'changed deadline', target: 'for "Landing Page"', sub: 'Due date changed from May 24 to May 28', subLink: false, icon: 'clock', iconColor: '#f59e0b', category: 'Tasks' },
      { time: '11:05 AM', user: 'Guy Hawkins', action: 'commented on task', target: '"User Flow Research"', sub: '@Alex Please check the new flow', subLink: false, icon: 'comment', iconColor: '#7045ba', category: 'Comments' },
    ],
  },
  {
    group: 'This Week',
    items: [
      { time: 'May 20, 02:10 PM', user: 'John Smith', action: 'added Ivan to project', target: '"Backend Services"', sub: 'Role: Developer', subLink: false, icon: 'userPlus', iconColor: '#5f1ee2', category: 'Team' },
      { time: 'May 20, 09:30 AM', user: 'Esther Howard', action: 'completed task', target: '"Setup CI/CD pipeline"', sub: 'In project DevOps Infrastructure', subLink: true, icon: 'check', iconColor: '#22c98a', category: 'Tasks' },
      { time: 'May 19, 04:00 PM', user: 'Cameron W.', action: 'updated', target: 'Brand Identity files', sub: '3 files updated', subLink: false, icon: 'file', iconColor: '#a07de0', category: 'Projects' },
    ],
  },
]

export const TABLE_SUMMARY_ITEMS: TableSummaryItem[] = [
  { label: 'Total Items', value: '48', icon: 'taskList', color: '#7045ba' },
  { label: 'Active Projects', value: '12', icon: 'folder', color: '#5f1ee2' },
  { label: 'Overdue Tasks', value: '7', icon: 'alert', color: '#ef4444' },
  { label: 'Avg. Progress', value: '64%', icon: 'chart', color: '#22c98a' },
]

export const TABLE_ROWS: TableRow[] = [
  { name: 'Website Redesign', type: 'Project', owner: 'Alex Morgan', status: 'Active', priority: 'High', progress: 68, due: 'May 28', updated: '2h ago' },
  { name: 'Auth API', type: 'Task', owner: 'Ivan Petrov', status: 'Review', priority: 'Medium', progress: 90, due: 'May 12', updated: '4h ago' },
  { name: 'Mobile App Redesign', type: 'Project', owner: 'Maria Chen', status: 'Planning', priority: 'High', progress: 24, due: 'Jun 03', updated: 'Yesterday' },
  { name: 'Landing Page', type: 'Task', owner: 'Kate Wilson', status: 'Overdue', priority: 'High', progress: 40, due: 'Apr 25', updated: 'Yesterday' },
  { name: 'Backend Services', type: 'Project', owner: 'Ivan Petrov', status: 'At Risk', priority: 'High', progress: 52, due: 'May 30', updated: '2d ago' },
  { name: 'User Flow Research', type: 'Task', owner: 'Maria Chen', status: 'In Progress', priority: 'Low', progress: 35, due: 'Jun 10', updated: '3d ago' },
]

export const INSIGHT_METRICS: InsightMetric[] = [
  { label: 'Project Health Score', value: '78%', sub: '+3% vs last week', color: '#22c98a', icon: 'activity' },
  { label: 'Delivery Risk', value: 'Medium', sub: '2 projects at risk', color: '#f59e0b', icon: 'alert' },
  { label: 'Team Workload', value: 'High', sub: 'Ivan at 91% capacity', color: '#ef4444', icon: 'team' },
  { label: 'Velocity', value: '+12%', sub: 'vs previous sprint', color: '#7045ba', icon: 'bolt' },
]

export const INSIGHT_PROJECTS: InsightProject[] = [
  { name: 'Website Redesign', status: 'Healthy', progress: 68, note: 'On track', color: '#22c98a' },
  { name: 'Backend Services', status: 'At Risk', progress: 52, note: 'Blocked tasks', color: '#ef4444' },
  { name: 'Mobile App Redesign', status: 'Needs Attention', progress: 24, note: 'Low progress', color: '#f59e0b' },
  { name: 'DevOps Infrastructure', status: 'Healthy', progress: 81, note: 'On track', color: '#22c98a' },
]

export const RISKS: Risk[] = [
  { title: 'Landing Page overdue', desc: 'Overdue by 4 days - no assignee action', level: 'high', icon: 'alert' },
  { title: 'Auth API stuck in Review', desc: 'No progress for 3 days', level: 'medium', icon: 'clock' },
  { title: 'Backend: 4 blocked tasks', desc: 'Multiple dependencies unresolved', level: 'high', icon: 'xmark' },
  { title: 'Mobile App low progress', desc: 'Deadline Jun 03, only 24% complete', level: 'medium', icon: 'file' },
]

export const TEAM_LOAD: TeamMember[] = [
  { name: 'Ivan Petrov', role: 'Backend Dev', load: 91, color: '#ef4444' },
  { name: 'Alex Morgan', role: 'Lead Designer', load: 86, color: '#f59e0b' },
  { name: 'Maria Chen', role: 'Product Manager', load: 72, color: '#7045ba' },
  { name: 'Kate Wilson', role: 'Frontend Dev', load: 64, color: '#22c98a' },
]

export const SUGGESTIONS: Suggestion[] = [
  { icon: 'team', title: 'Reassign tasks from Ivan', desc: '2 tasks can move to Kate - frees 18% load', action: 'Review', color: '#7045ba' },
  { icon: 'alert', title: 'Review overdue Landing Page', desc: 'Task is 4 days past due with no update', action: 'Open', color: '#ef4444' },
  { icon: 'calendar', title: 'Schedule Backend Services sync', desc: 'Team sync recommended to unblock tasks', action: 'Schedule', color: '#3b82f6' },
  { icon: 'layers', title: 'Break down Mobile App milestones', desc: 'Split into 3 smaller deliverables', action: 'Plan', color: '#a07de0' },
]
