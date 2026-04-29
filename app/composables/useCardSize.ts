import { faBars, faTableCells, faTableList } from '@fortawesome/free-solid-svg-icons'
import type { CardSize } from '~/features/tasks/tasks.types'

export function useCardSize() {
  const cardSize = ref<CardSize>('default')

  const CARD_SIZES = [
    { key: 'compact' as CardSize, icon: faBars,       title: 'Compact' },
    { key: 'default' as CardSize, icon: faTableCells, title: 'Default' },
    { key: 'large'   as CardSize, icon: faTableList,  title: 'Large'   },
  ] as const

  return { cardSize, CARD_SIZES }
}
