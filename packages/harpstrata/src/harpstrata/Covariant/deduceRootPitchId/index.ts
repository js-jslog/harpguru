import { RootPitchControlVars } from '../types'
import { getPozitionRootOffset } from '../../Pozition'
import type { PitchIds } from '../../Pitch'
import { getAscendingPitchIds } from '../../OrderedIds'


export const deduceRootPitchId = (props: RootPitchControlVars): PitchIds => {
  const { harpKeyId, pozitionId } = props
  const rootOffset = getPozitionRootOffset(pozitionId)

  const ascendingPitchIds = getAscendingPitchIds(harpKeyId)

  const { [rootOffset]: rootPitchId } = ascendingPitchIds

  return rootPitchId
}
