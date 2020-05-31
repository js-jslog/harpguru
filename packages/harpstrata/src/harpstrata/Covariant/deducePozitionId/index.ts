import { PozitionControlVars } from '../types'
import type { PozitionIds } from '../../Pozition'
import { getAscendingPozitionIds } from '../../OrderedIds'
import { getAscendingPitchIds } from '../../OrderedIds'


export const deducePozitionId = (props: PozitionControlVars): PozitionIds => {
  const { rootPitchId, harpKeyId } = props

  const harpKeyAscendingPitchIds = getAscendingPitchIds(harpKeyId)

  const rootPitchIndex = harpKeyAscendingPitchIds.indexOf(rootPitchId)

  const { [rootPitchIndex]: pozitionId } = getAscendingPozitionIds()

  return pozitionId
}
