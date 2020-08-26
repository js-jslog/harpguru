import type { ActiveIdsPair, ActivePitchIds, ActiveDegreeIds } from '../types'
import {
  getCounterpartDegreeIds,
  getCounterpartPitchIds,
} from '../getCounterpartActiveIds'
import type { IsActiveProps } from '../../types'
import { DegreeIds } from '../../../Degree'

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

export type { ActiveIds, ActivePitchIds, ActiveDegreeIds } from '../types'
