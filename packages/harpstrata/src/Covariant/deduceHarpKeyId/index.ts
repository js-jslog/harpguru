import { getPitchIds, getPozition, reversePreserveOrigin } from 'harpparts'
import type { PitchIds } from 'harpparts'

import { HarpKeyControllers } from '../types'

export const deduceHarpKeyId = (props: HarpKeyControllers): PitchIds => {
  const { rootPitchId, pozitionId } = props
  const { rootOffset } = getPozition(pozitionId)

  const descendingPitchIds = reversePreserveOrigin(getPitchIds(rootPitchId))

  const { [rootOffset]: harpKeyId } = descendingPitchIds

  return harpKeyId
}
