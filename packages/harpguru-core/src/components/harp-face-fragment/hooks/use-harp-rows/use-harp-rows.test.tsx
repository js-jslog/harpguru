import { useGlobal } from 'reactn'

// TODO: remove this import. Work on test data construction instead and make
// the mock objects easier to construct.
import { deriveViewableMatrix } from '../../../new-harpstrata-state-callback/utils'
import { inactiveCellsHarpStrata as activeHarpStrata } from '../../../../test-resources'

import { useHarpRows } from './use-harp-rows'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('useHarpRows returns an object with the rows split between the blow / draw holes', () => {
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [activeHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix') return [activeHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [activeHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [activeHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [activeHarpStrata.activeDegreeIds]
    if (stateItem === 'columnBounds') return ['FIT']
    return undefined
  })
  const xRange = [0, 1, 2]
  const holeRows = useHarpRows(xRange)
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})

test('useHarpRows returns a column bounded object with the rows split between the blow / draw holes', () => {
  const viewableInteractionMatrix = deriveViewableMatrix(
    activeHarpStrata.apparatus.interactionMatrix,
    [1, 7]
  )
  mockUseGlobal.mockImplementation((stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [activeHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix') return [activeHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [activeHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [viewableInteractionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [activeHarpStrata.activeDegreeIds]
    if (stateItem === 'columnBounds') return [[1, 7]]
    return undefined
  })
  const xRange = [1, 2, 3, 4, 5, 6, 7]
  const holeRows = useHarpRows(xRange)
  expect(holeRows.top.length).toBe(2)
  expect(holeRows.bottom.length).toBe(4)
})
