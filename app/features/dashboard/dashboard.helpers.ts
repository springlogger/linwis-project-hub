import {
  AVATAR_PALETTE,
  BADGE_STYLES,
  DEFAULT_BADGE_STYLE,
  type BadgeStyle,
  type TaskBreakdownItem,
} from './dashboard.data'

export type RingParams = {
  radius: number
  circumference: number
  dashLength: number
  center: number
  size: number
  stroke: number
}

export type DonutSegment = TaskBreakdownItem & {
  dashLength: number
  circumference: number
  rotation: number
}

export function getRingParams(percent: number, size = 46, stroke = 4.5): RingParams {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashLength = (percent / 100) * circumference

  return {
    radius,
    circumference,
    dashLength,
    center: size / 2,
    size,
    stroke,
  }
}

export function getSparklinePoints(data: number[]): string {
  const width = 72
  const height = 32
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = Math.max(maxValue - minValue, 1)

  return data
    .map((value, index) => {
      const xPosition = (index / Math.max(data.length - 1, 1)) * width
      const yPosition = height - ((value - minValue) / range) * height

      return `${xPosition},${yPosition}`
    })
    .join(' ')
}

export function getAvatarInitials(name: string): string {
  return name
    .split(' ')
    .map((namePart) => namePart[0] ?? '')
    .join('')
    .slice(0, 2)
}

export function getAvatarBackground(name: string): string {
  const firstCharacterCode = name.charCodeAt(0)

  if (Number.isNaN(firstCharacterCode)) {
    return AVATAR_PALETTE[0]
  }

  return AVATAR_PALETTE[firstCharacterCode % AVATAR_PALETTE.length] ?? AVATAR_PALETTE[0]
}

export function getBadgeStyle(tag: string): BadgeStyle {
  return BADGE_STYLES[tag.toLowerCase()] ?? DEFAULT_BADGE_STYLE
}

export function getDonutSegments(items: TaskBreakdownItem[]): DonutSegment[] {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  let currentOffset = 0

  return items.map((item) => {
    const dashLength = (item.pctVal / 100) * circumference
    const rotation = (currentOffset / 100) * 360 - 90
    currentOffset += item.pctVal

    return {
      ...item,
      dashLength,
      circumference,
      rotation,
    }
  })
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) {
    return '#22c98a'
  }

  if (progress >= 50) {
    return '#7045ba'
  }

  return '#f59e0b'
}
