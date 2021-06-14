import type { Interaction } from './interaction'
import type { ApparatusIds } from './apparatus'
import { getApparatus, getApparatusIds } from './access-parts'

import type { HalfstepIndex, HarpFaceMatrix, HarpFaceRow } from './types'

// TODO: the parity checking logic in here needs it's own test to make sure it's working.
// The parity checking logic actually needs to be improved quite a lot too.
// It would also be nice to get all the results of the partiy check in before the test fails too.
// We need to check that this test fails if a reed config is made available which is leads to a hole array error.
test('Each of the apparatus halfstep matrices have parity with their interaction matrices, and no errors are thrown in the process', () => {
  const matricesHaveParity = (
    matrixA: HarpFaceMatrix<HalfstepIndex>,
    matrixB: HarpFaceMatrix<Interaction>,
    apparatusId: ApparatusIds
  ): boolean => {
    const matrix1dsMatch = matrixA.length === matrixB.length
    const matrix2dsMatch = matrixA[0].length === matrixB[0].length
    if (!matrix1dsMatch || !matrix2dsMatch) {
      console.log(`Matrices lengths don't match in ${apparatusId}`)
      return false
    }

    const matricesDoNotHaveParity = matrixA.some(
      (rowA: HarpFaceRow<HalfstepIndex>, indexY: number) => {
        return rowA.some(
          (elementA: HalfstepIndex | undefined, indexX: number) => {
            const {
              [indexY]: { [indexX]: elementB },
            } = matrixB
            const noParityA = elementA === undefined && elementB !== undefined
            const noParityB = elementA !== undefined && elementB === undefined

            if (noParityA || noParityB) {
              console.log(
                `Mismatch found at YX (${indexY},${indexX}) in ${apparatusId}`
              )
            }

            return noParityA || noParityB
          }
        )
      }
    )

    return !matricesDoNotHaveParity
  }
  getApparatusIds()
    .map((apparatusId) => getApparatus(apparatusId))
    .forEach((apparatus) => {
      const hasParity = matricesHaveParity(
        apparatus.halfstepIndexMatrix,
        apparatus.interactionMatrix,
        apparatus.id
      )
      expect(hasParity).toBeTruthy()
    })
})
