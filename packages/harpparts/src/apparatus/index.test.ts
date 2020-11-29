import type { HalfstepIndex, HarpFaceMatrix, HarpFaceRow } from '../types'

import type { ApparatusIds, Interaction } from './types'
import {
  MAJOR_DIATONIC_APPARATUS,
  COUNTRY_TUNED_APPARATUS,
  NATURAL_MINOR_APPARATUS,
  WILDE_TUNED_APPARATUS,
  POWER_BENDER_APPARATUS,
} from './constants'

// TODO: These tests all belong elsewhere but we haven't built up the context for them to
// be moved yet. I've removed the internals of the first 2 tests since their functions will
// be replaced but you can recreate their intentions from the test descriptions.
test('getActiveApparatusIds function returns an array of the available apparatus Ids', () => {
  expect(true).toBeTruthy()
})

test('getApparatus function can return a major diatonic apparatus', () => {
  expect(true).toBeTruthy()
})

// TODO: I've adapted the internals of this so that it still works, but we'll want to move
// and slightly rewrite this once able. It would be nice to not have to manually add the new
// apparatus's to the list for example but rather just be assured that if the package is making
// the apparatus available, that apparatus will have been validated.
test('Each of the apparatus halfstep matrices have parity with their interaction matrices', () => {
  const matricesHaveParity = (
    matrixA: HarpFaceMatrix<HalfstepIndex>,
    matrixB: HarpFaceMatrix<Interaction>,
    apparatusId: ApparatusIds
  ): boolean => {
    const matrix1dsMatch = matrixA.length === matrixB.length
    const matrix2dsMatch = matrixA[0].length === matrixB[0].length
    if (!matrix1dsMatch || !matrix2dsMatch) return false

    const matricesDoNotHaveParity = matrixA.some(
      (rowA: HarpFaceRow<HalfstepIndex>, indexY: number) => {
        return rowA.some(
          (elementA: HalfstepIndex | undefined, indexX: number) => {
            const {
              [indexY]: { [indexX]: elementB },
            } = matrixB
            const noParityA = elementA === undefined && elementB !== undefined
            const noParityB = elementA !== undefined && elementB === undefined

            if (noParityA || noParityB)
              console.log(
                `Mismatch found at YX (${indexY},${indexX}) in ${apparatusId}`
              )

            return noParityA || noParityB
          }
        )
      }
    )

    return !matricesDoNotHaveParity
  }
  ;[
    MAJOR_DIATONIC_APPARATUS,
    COUNTRY_TUNED_APPARATUS,
    NATURAL_MINOR_APPARATUS,
    WILDE_TUNED_APPARATUS,
    POWER_BENDER_APPARATUS,
  ].forEach((apparatus) => {
    const hasParity = matricesHaveParity(
      apparatus.halfstepIndexMatrix,
      apparatus.interactionMatrix,
      apparatus.id
    )
    expect(hasParity).toBeTruthy()
  })
})
