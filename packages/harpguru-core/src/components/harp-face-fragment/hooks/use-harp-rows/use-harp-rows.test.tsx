import { useGlobal } from 'reactn'

import { buildMockUseGlobalImplementation } from '../../../../test-resources'

import { useHarpRows } from './use-harp-rows'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('useHarpRows returns an object with the rows split between the blow / draw holes', () => {
  mockUseGlobal.mockImplementation(buildMockUseGlobalImplementation({}))
  const xRange = [0, 1, 2]
  const holeRows = useHarpRows(xRange)
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})

test('useHarpRows returns a column bounded object with the rows split between the blow / draw holes', () => {
  mockUseGlobal.mockImplementation(
    buildMockUseGlobalImplementation({
      sourceColumnBounds: [1, 7],
    })
  )
  const xRange = [1, 2, 3, 4, 5, 6, 7]
  const holeRows = useHarpRows(xRange)
  expect(holeRows.top.length).toBe(2)
  expect(holeRows.bottom.length).toBe(4)
})
