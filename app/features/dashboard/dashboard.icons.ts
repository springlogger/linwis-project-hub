import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBolt,
  faCalendarDays,
  faChartSimple,
  faCheck,
  faClock,
  faComment,
  faFileLines,
  faFolder,
  faLayerGroup,
  faListCheck,
  faRightLeft,
  faTriangleExclamation,
  faUserGroup,
  faUserPlus,
  faWaveSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import type { DashboardIconKey } from './dashboard.data'

export const DASHBOARD_ICON_MAP: Record<DashboardIconKey, IconDefinition> = {
  activity: faWaveSquare,
  alert: faTriangleExclamation,
  bolt: faBolt,
  calendar: faCalendarDays,
  chart: faChartSimple,
  check: faCheck,
  clock: faClock,
  comment: faComment,
  file: faFileLines,
  folder: faFolder,
  layers: faLayerGroup,
  move: faRightLeft,
  taskList: faListCheck,
  team: faUserGroup,
  userPlus: faUserPlus,
  xmark: faXmark,
}
