import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceIdedMatrix } from './reduce-idedmatrix'

test('the previous matrix is returned if it matches the next one', () => {
  const {
    degreeMatrix: prevDegreeMatrix,
    pitchMatrix: prevPitchMatrix,
  } = activeCellsHarpStrata
  const {
    apparatus: { interactionMatrix: prevInteractionMatrix },
  } = activeCellsHarpStrata

  const nextInteractionMatrix = [...prevInteractionMatrix]
  const nextDegreeMatrix = [...prevDegreeMatrix]
  const nextPitchMatrix = [...prevPitchMatrix]

  expect(reduceIdedMatrix(prevInteractionMatrix, nextInteractionMatrix)).toBe(
    prevInteractionMatrix
  )
  expect(reduceIdedMatrix(prevDegreeMatrix, nextDegreeMatrix)).toBe(
    prevDegreeMatrix
  )
  expect(reduceIdedMatrix(prevPitchMatrix, nextPitchMatrix)).toBe(
    prevPitchMatrix
  )
})

test('the next matrix is returned if it doesnt match the previous one', () => {
  const {
    degreeMatrix: prevDegreeMatrix,
    pitchMatrix: prevPitchMatrix,
  } = activeCellsHarpStrata
  const {
    apparatus: { interactionMatrix: prevInteractionMatrix },
  } = activeCellsHarpStrata

  const nextInteractionMatrix = [
    ...prevInteractionMatrix,
    ...prevInteractionMatrix,
  ]
  const nextDegreeMatrix = [...prevDegreeMatrix, ...prevDegreeMatrix]
  const nextPitchMatrix = [...prevPitchMatrix, ...prevPitchMatrix]

  expect(reduceIdedMatrix(prevInteractionMatrix, nextInteractionMatrix)).toBe(
    nextInteractionMatrix
  )
  expect(reduceIdedMatrix(prevDegreeMatrix, nextDegreeMatrix)).toBe(
    nextDegreeMatrix
  )
  expect(reduceIdedMatrix(prevPitchMatrix, nextPitchMatrix)).toBe(
    nextPitchMatrix
  )
})
