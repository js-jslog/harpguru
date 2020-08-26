import { RootPitchControllers } from '../types'
import { getPozition } from '../../Pozition'
import type { PitchIds } from '../../Pitch'
import { getAscendingPitchIds } from '../../OrderedIds'

export const deduceRootPitchId = (props: RootPitchControllers): PitchIds => {
  const { harpKeyId, pozitionId } = props
  const { rootOffset } = getPozition(pozitionId)

  const ascendingPitchIds = getAscendingPitchIds(harpKeyId)

  const { [rootOffset]: rootPitchId } = ascendingPitchIds

  return rootPitchId
}
