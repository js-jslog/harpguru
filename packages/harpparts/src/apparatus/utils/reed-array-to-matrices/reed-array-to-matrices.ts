import { pivotReedArray } from '../pivot-reed-array'
import { mapReedPairToHole } from '../map-reed-pair-to-hole'
import { mapHoleToIncludeOverbends } from '../map-hole-to-include-overbends'
import { mapHoleToIncludeBends } from '../map-hole-to-include-bends'
import { mapHoleToFilterOverbends } from '../map-hole-to-filter-overbends'
import { mapHoleTierToInteractionid } from '../map-hole-tier-to-interactionid'
import { mapHoleTierToHalfstepindex } from '../map-hole-tier-to-halstepindex'
import { deriveMatrixSpecs } from '../derive-matrix-specs/derive-matrix-specs'
import type { HoleArray, ReedArray } from '../../types'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import type { Interaction } from '../../../interaction'

type Matrices = {
  halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  interactionMatrix: HarpFaceMatrix<Interaction>
}

export const reedArrayToMatrices = (reedArray: ReedArray): Matrices => {
  const holeArray = pivotReedArray(reedArray)
    .map(mapReedPairToHole)
    .map(mapHoleToIncludeBends)
    .map(mapHoleToIncludeOverbends)
    .map(mapHoleToFilterOverbends) as HoleArray

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
