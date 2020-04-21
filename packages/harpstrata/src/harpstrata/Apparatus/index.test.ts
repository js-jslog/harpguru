import { ApparatusIds, InteractionMatrix, HalfstepIndex, HalfstepIndexRow, HalfstepIndexMatrix } from './types'
import { getActiveApparatusIds, getApparatus } from './index'
import { MAJOR_DIATONIC_APPARATUS } from './constants'

test('getActiveApparatusIds function returns an array of the available apparatus Ids', () => {
  const appratusIds = getActiveApparatusIds()
  expect(appratusIds.includes(ApparatusIds.MajorDiatonic)).toBeTruthy()
})

test('getApparatus function can return a major diatonic apparatus', () => {
  const actualApparatus = getApparatus(ApparatusIds.MajorDiatonic)

  expect(actualApparatus).toStrictEqual(MAJOR_DIATONIC_APPARATUS)
})

test('Each of the apparatus halfstep matrices have parity with their interaction matrices', () => {
  const matricesHaveParity = (matrixA: HalfstepIndexMatrix, matrixB: InteractionMatrix, apparatusId: ApparatusIds): boolean => {
    const matrix1dsMatch = (matrixA.length === matrixB.length)
    const matrix2dsMatch = (matrixA[0].length === matrixB[0].length)
    if (!matrix1dsMatch || !matrix2dsMatch) return false

    const matricesDoNotHaveParity = matrixA.some((rowA: HalfstepIndexRow, indexY: number) => {
      return rowA.some((elementA: HalfstepIndex | undefined, indexX: number) => {
        const { [indexY]: { [indexX]: elementB } } = matrixB
        const noParityA = (elementA === undefined && elementB !== undefined)
        const noParityB = (elementA !== undefined && elementB === undefined)

        if (noParityA || noParityB) console.log(`Mismatch found at YX (${indexY},${indexX}) in ${apparatusId}`)

        return (noParityA || noParityB)
      })
    })

    return !matricesDoNotHaveParity
  }
  getActiveApparatusIds().forEach(apprartusId => {
    const apparatus = getApparatus(apprartusId)
    const hasParity = matricesHaveParity(apparatus.halfstepIndexMatrix, apparatus.interactionMatrix, apparatus.id)
    expect(hasParity).toBeTruthy()
  })
})
