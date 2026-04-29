export type BadgeStyle = {
  bg: string
  color: string
}

export const DEFAULT_BADGE_STYLE: BadgeStyle = { bg: 'rgba(112,69,186,0.2)', color: '#a07de0' }

export const BADGE_STYLES: Record<string, BadgeStyle> = {
  high:          { bg: 'rgba(239,68,68,0.15)',  color: '#ef4444' },
  medium:        { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  low:           { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  completed:     { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
  'in progress': { bg: 'rgba(95,30,226,0.2)',   color: '#9b6cf7' },
  review:        { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  default:       DEFAULT_BADGE_STYLE,
}

export const STATUS_STYLES: Record<string, BadgeStyle> = {
  Active:            { bg: 'rgba(34,201,138,0.15)',  color: '#22c98a' },
  Review:            { bg: 'rgba(245,158,11,0.15)',  color: '#f59e0b' },
  Planning:          { bg: 'rgba(112,69,186,0.2)',   color: '#a07de0' },
  Overdue:           { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
  'At Risk':         { bg: 'rgba(239,68,68,0.12)',   color: '#f87171' },
  'In Progress':     { bg: 'rgba(95,30,226,0.2)',    color: '#9b6cf7' },
  Healthy:           { bg: 'rgba(34,201,138,0.15)',  color: '#22c98a' },
  'Needs Attention': { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
}

export const PRIORITY_STYLES: Record<string, BadgeStyle> = {
  High:   { bg: 'rgba(239,68,68,0.15)',  color: '#ef4444' },
  Medium: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  Low:    { bg: 'rgba(34,201,138,0.15)', color: '#22c98a' },
}

export function getBadgeStyle(tag: string): BadgeStyle {
  return BADGE_STYLES[tag.toLowerCase()] ?? DEFAULT_BADGE_STYLE
}
