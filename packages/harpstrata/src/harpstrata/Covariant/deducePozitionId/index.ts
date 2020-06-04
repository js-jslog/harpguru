import { PozitionControllers } from '../types'
import { getPozitionByOffset } from '../../Pozition'
import type { PozitionIds } from '../../Pozition'
import { getAscendingPitchIds } from '../../OrderedIds'


export const deducePozitionId = (props: PozitionControllers): PozitionIds => {
  const { rootPitchId, harpKeyId } = props

  const harpKeyAscendingPitchIds = getAscendingPitchIds(harpKeyId)

  const rootPitchOffset = harpKeyAscendingPitchIds.indexOf(rootPitchId)

  const { id: pozitionId } = getPozitionByOffset(rootPitchOffset)

  return pozitionId
}
