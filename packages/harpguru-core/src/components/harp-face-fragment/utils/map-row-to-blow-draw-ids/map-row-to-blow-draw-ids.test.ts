import { InteractionIds } from 'harpparts'

import { inactiveCellsHarpStrata } from '../../../../test-resources'

import { mapRowToBlowDrawIds } from './map-row-to-blow-draw-ids'

const { Blow, Draw } = InteractionIds

test('mapRowToBlowDrawIds can be used to map a matrix to just an array indicating whether that was a blow or draw row, or neither', () => {
  const {
    apparatus: { interactionMatrix },
  } = inactiveCellsHarpStrata

  const resultingArray = interactionMatrix.map(mapRowToBlowDrawIds)
  const expectedArray = [
    undefined,
    undefined,
    Blow,
    Draw,
    undefined,
    undefined,
    undefined,
  ]

  expect(resultingArray).toEqual(expectedArray)
})
