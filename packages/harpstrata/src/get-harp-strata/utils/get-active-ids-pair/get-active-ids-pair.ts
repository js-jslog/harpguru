import { DegreeIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import {
  getCounterpartDegreeIds,
  getCounterpartPitchIds,
} from '../get-counterpart-active-ids'
import type { IsActiveProps, ActiveIdsPair } from '../../../types'

export const getActiveIdsPair = (props: IsActiveProps): ActiveIdsPair => {
  const { activeIds } = props
  // TODO: Can replace this logic with a typeguard now. It took a
  // minute for me to figure out what was going on.
  const possibleDegreeId = activeIds[0] as DegreeIds
  if (Object.values(DegreeIds).includes(possibleDegreeId)) {
    const activeDegreeIds = [...(activeIds as ReadonlyArray<DegreeIds>)].sort()
    const activePitchIds = [...getCounterpartPitchIds(props)].sort()
    return { activeDegreeIds, activePitchIds }
  }
  const activePitchIds = [...(activeIds as ReadonlyArray<PitchIds>)].sort()
  const activeDegreeIds = [...getCounterpartDegreeIds(props)].sort()
  return { activeDegreeIds, activePitchIds }
}
