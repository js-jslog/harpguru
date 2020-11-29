import { getPitchIds, getPozition } from 'harpparts'
import type { PitchIds } from 'harpparts'

import { RootPitchControllers } from '../../types'

export const deduceRootPitchId = (props: RootPitchControllers): PitchIds => {
  const { harpKeyId, pozitionId } = props
  const { rootOffset } = getPozition(pozitionId)

  const ascendingPitchIds = getPitchIds(harpKeyId)

  const { [rootOffset]: rootPitchId } = ascendingPitchIds

  return rootPitchId
}
