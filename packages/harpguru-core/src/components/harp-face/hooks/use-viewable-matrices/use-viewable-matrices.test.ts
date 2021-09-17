import { useGlobal } from 'reactn'

import { inactiveCellsHarpStrata } from '../../../../test-resources'

import { useViewableMatrices } from './use-viewable-matrices'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('Entire degreeMatrix is viewable when columnBounds is FIT', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeHarpStrata') return [inactiveCellsHarpStrata]
    if (stateItem === 'columnBounds') return 'FIT'
    return undefined
  })

  expect(useViewableMatrices().viewableDegreeMatrix).toStrictEqual(
    inactiveCellsHarpStrata.degreeMatrix
  )
})
