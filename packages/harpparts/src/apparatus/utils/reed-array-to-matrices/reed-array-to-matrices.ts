import { pivotReedArray } from '../pivot-reed-array'
import { mapReedPairToHole } from '../map-reed-pair-to-hole'
import { mapHoleToIncludeOverbends } from '../map-hole-to-include-overbends'
import { mapHoleToIncludeBends } from '../map-hole-to-include-bends'
import { mapHoleToFilterOverbends } from '../map-hole-to-filter-overbends'
import { mapHoleTierToInteractionid } from '../map-hole-tier-to-interactionid'
import { mapHoleTierToHalfstepindex } from '../map-hole-tier-to-halstepindex'
import { getHoleArrayErrorMessages } from '../get-hole-array-error-messages'
import { deriveMatrixSpecs } from '../derive-matrix-specs/derive-matrix-specs'
import type { HoleArray } from '../../types'
import type { Apparatus } from '../../types'
import type { TuningIds, ReedArray } from '../../../tuning'

export const reedArrayToMatrices = (
  reedArray: ReedArray,
  tuningId: TuningIds
): Pick<Apparatus, 'halfstepIndexMatrix' | 'interactionMatrix'> => {
  const holeArray = pivotReedArray(reedArray)
    .map(mapReedPairToHole)
    .map(mapHoleToIncludeBends)
    .map(mapHoleToIncludeOverbends)
    .map(mapHoleToFilterOverbends) as HoleArray

  const holeErrorMessages = getHoleArrayErrorMessages(holeArray)
  if (holeErrorMessages.length > 0)
    throw new Error(`
    The following issues with the hole array
    produced for ${tuningId} were detected:

    ${JSON.stringify(holeErrorMessages)}
  `)

  const matrixSpecs = deriveMatrixSpecs(holeArray)

  const matrixPrimer = new Array(matrixSpecs.height).fill(undefined)

  const halfstepIndexMatrix = matrixPrimer.map((_, index) =>
    holeArray.map(
      mapHoleTierToHalfstepindex.bind(undefined, matrixSpecs, index)
    )
  )
  const interactionMatrix = matrixPrimer.map((_, index) =>
    holeArray.map(
      mapHoleTierToInteractionid.bind(undefined, matrixSpecs, index)
    )
  )
  return {
    halfstepIndexMatrix,
    interactionMatrix,
  }
}
