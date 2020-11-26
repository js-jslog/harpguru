import { getPozition } from 'harpparts'

import type { HarpStrataProps, HarpStrata } from '../types'
import { getPitchMatrix, getPitch } from '../../Pitch'
import { getActiveIdsPair } from '../../IsActive'
import { getDegreeMatrix } from '../../Degree'
import { getCovariantSet } from '../../Covariant'
import { getApparatus } from '../../Apparatus'

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
