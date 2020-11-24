import type {
  IsActiveProps,
  ActiveIdsPair,
  ActivePitchIds,
  ActiveDegreeIds,
} from '../types'
import { DegreeIds } from '../../Degree'

import { getCounterpartDegreeIds, getCounterpartPitchIds } from './utils'

export const getActiveIdsPair = (props: IsActiveProps): ActiveIdsPair => {
  const { activeIds } = props
  const possibleDegreeId = activeIds[0] as DegreeIds
  if (Object.values(DegreeIds).includes(possibleDegreeId)) {
    const activeDegreeIds = [...(activeIds as ActiveDegreeIds)].sort()
    const activePitchIds = [...getCounterpartPitchIds(props)].sort()
    return { activeDegreeIds, activePitchIds }
  }
  const activePitchIds = [...(activeIds as ActivePitchIds)].sort()
  const activeDegreeIds = [...getCounterpartDegreeIds(props)].sort()
  return { activeDegreeIds, activePitchIds }
}
