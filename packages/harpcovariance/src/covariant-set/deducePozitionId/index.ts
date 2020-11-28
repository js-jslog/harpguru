import { getPitchIds, getPozitionByOffset } from 'harpparts'
import type { PozitionIds } from 'harpparts'

import { PozitionControllers } from '../types'

export const deducePozitionId = (props: PozitionControllers): PozitionIds => {
  const { rootPitchId, harpKeyId } = props

  const harpKeyAscendingPitchIds = getPitchIds(harpKeyId)

  const rootPitchOffset = harpKeyAscendingPitchIds.indexOf(rootPitchId)

  const { id: pozitionId } = getPozitionByOffset(rootPitchOffset)

  return pozitionId
}
