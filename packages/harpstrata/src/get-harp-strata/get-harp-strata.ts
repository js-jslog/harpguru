import { buildApparatus, getPitch, getPozition } from 'harpparts'
import { getCovariantSet } from 'harpcovariance'

import type { HarpStrataProps, HarpStrata } from '../types'

import { getDegreeMatrix, getPitchMatrix, getActiveIdsPair } from './utils'

export const getHarpStrata = (props: HarpStrataProps): HarpStrata => {
  const { tuningId, valvingId, pozitionId, harpKeyId, activeIds } = props

  const apparatus = buildApparatus(tuningId, valvingId)

  const { rootOffset } = getPozition(pozitionId)
  const pitch = getPitch(harpKeyId)
  const { id: pitchId } = pitch

  const degreeMatrices = [getDegreeMatrix(apparatus.halfstepIndexMatrix[0], rootOffset), getDegreeMatrix(apparatus.halfstepIndexMatrix[1], rootOffset)] as const
  const pitchMatrices = [getPitchMatrix(apparatus.halfstepIndexMatrix[0], pitchId), getPitchMatrix(apparatus.halfstepIndexMatrix[1], pitchId)] as const

  const { activeDegreeIds, activePitchIds } = getActiveIdsPair({
    degreeMatrix: degreeMatrices[0],
    pitchMatrix: pitchMatrices[0],
    activeIds: activeIds,
  })

  const { rootPitchId } = getCovariantSet({ pozitionId, harpKeyId })

  return {
    apparatus,
    // TODO: It will be necessary to modify the name of these properties eventually
    degreeMatrix: degreeMatrices,
    pitchMatrix: pitchMatrices,
    activeDegreeIds,
    activePitchIds,
    pozitionId,
    rootPitchId,
    harpKeyId,
  }
}
