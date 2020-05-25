import { PozitionControlVars } from '../types'
import { getAscendingPozitionIds } from '../../Pozition'
import type { PozitionIds } from '../../Pozition'
import { getAscendingPitchIds } from '../../Pitch'


export const deducePozitionId = (props: PozitionControlVars): PozitionIds => {
  const { rootPitchId, harpKeyId } = props

  const harpKeyAscendingPitchIds = getAscendingPitchIds(harpKeyId)

  const rootPitchIndex = harpKeyAscendingPitchIds.indexOf(rootPitchId)

  const { [rootPitchIndex]: pozitionId } = getAscendingPozitionIds()

  return pozitionId
}
