import { InteractionIds } from 'harpparts'

import { activeCellsHarpStrata } from '../../../../test-resources'

import { reduceHarpStrataToFullInteractionMatrix } from './reduce-harpstrata-to-fullinteractionmatrix'

test('the previous fullInteractionMatrix object is returned if it matches the one on the harpstrata', () => {
  const harpStrata = activeCellsHarpStrata
  const {
    apparatus: { interactionMatrix },
  } = harpStrata
  const prevInteractionMatrix = [...interactionMatrix]
  const nextInteractionMatrix = reduceHarpStrataToFullInteractionMatrix(
    prevInteractionMatrix,
    harpStrata
  )

  expect(nextInteractionMatrix).toBe(prevInteractionMatrix)
  expect(nextInteractionMatrix).not.toBe(harpStrata.apparatus.interactionMatrix)
  expect(nextInteractionMatrix).toStrictEqual(
    harpStrata.apparatus.interactionMatrix
  )
})

test('the next fullInteractionMatrix object is returned if it is different from the previous', () => {
  const harpStrata = activeCellsHarpStrata
  const {
    apparatus: { interactionMatrix },
  } = harpStrata
  const [firstRow] = interactionMatrix
  const [, ...firstRowMinusFirstElement] = firstRow
  const firstRowNewFirstElement = [
    { id: InteractionIds.DrawBend3 },
    ...firstRowMinusFirstElement,
  ]
  const [, ...minusFirstRow] = interactionMatrix
  const prevInteractionMatrix = [firstRowNewFirstElement, ...minusFirstRow]
  const nextInteractionMatrix = reduceHarpStrataToFullInteractionMatrix(
    prevInteractionMatrix,
    harpStrata
  )

  expect(nextInteractionMatrix).not.toStrictEqual(prevInteractionMatrix)
  expect(nextInteractionMatrix).toBe(harpStrata.apparatus.interactionMatrix)
})
