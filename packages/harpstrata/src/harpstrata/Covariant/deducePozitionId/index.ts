import { getPozitionByOffset } from 'harpparts'
import type { PozitionIds } from 'harpparts'

import { PozitionControllers } from '../types'
import { getAscendingPitchIds } from '../../OrderedIds'

export const deducePozitionId = (props: PozitionControllers): PozitionIds => {
  const { rootPitchId, harpKeyId } = props

  const harpKeyAscendingPitchIds = getAscendingPitchIds(harpKeyId)

  const rootPitchOffset = harpKeyAscendingPitchIds.indexOf(rootPitchId)

  const { id: pozitionId } = getPozitionByOffset(rootPitchOffset)

  return pozitionId
}
