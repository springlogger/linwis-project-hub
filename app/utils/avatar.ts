export const AVATAR_PALETTE = ['#7045ba', '#5f1ee2', '#441f8e', '#3b5fe2', '#1e7a8e'] as const

export function getAvatarInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0] ?? '')
    .join('')
    .slice(0, 2)
}

export function getAvatarBackground(name: string): string {
  const code = name.charCodeAt(0)
  if (Number.isNaN(code)) return AVATAR_PALETTE[0]
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length] ?? AVATAR_PALETTE[0]
}
