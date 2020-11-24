import { HarpKeyControllers } from '../types'
import { getPozition } from '../../Pozition'
import type { PitchIds } from '../../Pitch'
import { getDescendingPitchIds } from '../../OrderedIds'

export const deduceHarpKeyId = (props: HarpKeyControllers): PitchIds => {
  const { rootPitchId, pozitionId } = props
  const { rootOffset } = getPozition(pozitionId)

  const descendingPitchIds = getDescendingPitchIds(rootPitchId)

  const { [rootOffset]: harpKeyId } = descendingPitchIds

  return harpKeyId
}
