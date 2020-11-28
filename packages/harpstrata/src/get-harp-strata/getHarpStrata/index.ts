import { getApparatus, getPitch, getPozition } from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

import { getPitchMatrix } from '../getPitchMatrix'
import { getDegreeMatrix } from '../getDegreeMatrix'
import type { HarpStrataProps, HarpStrata } from '../../types'
import { getActiveIdsPair } from '../../get-active-ids-pair'

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { apparatusId, pozitionId, harpKeyId, activeIds } = props

  const apparatus = getApparatus(apparatusId)
  const { rootOffset } = getPozition(pozitionId)
  const pitch = getPitch(harpKeyId)

  const { halfstepIndexMatrix } = apparatus
  const { id: pitchId } = pitch

  const degreeMatrix = getDegreeMatrix(halfstepIndexMatrix, rootOffset)
  const pitchMatrix = getPitchMatrix(halfstepIndexMatrix, pitchId)
  const { activeDegreeIds, activePitchIds } = getActiveIdsPair({
    degreeMatrix,
    pitchMatrix,
    activeIds: activeIds,
  })

  const { rootPitchId } = getCovariantSet({ pozitionId, harpKeyId })

  return {
    apparatus,
    degreeMatrix,
    pitchMatrix,
    activeDegreeIds,
    activePitchIds,
    pozitionId,
    rootPitchId,
    harpKeyId,
  }
}
