import { mockStoreImplementation } from '../../../../test-resources'
import { useHarpGuruStore } from '../../../../store'

import { useHarpRows } from './use-harp-rows'

jest.mock('../../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('useHarpRows returns an object with the rows split between the blow / draw holes', () => {
  mockUseHarpGuruStore.mockImplementation(mockStoreImplementation({}))
  const xRange = [0, 1, 2]
  const holeRows = useHarpRows(xRange, 'harpface1')
  expect(holeRows.top.length).toBe(3)
  expect(holeRows.bottom.length).toBe(4)
})

test('useHarpRows returns a column bounded object with the rows split between the blow / draw holes', () => {
  mockUseHarpGuruStore.mockImplementation(
    mockStoreImplementation({
      sourceColumnBounds: [1, 7],
    })
  )
  const xRange = [1, 2, 3, 4, 5, 6, 7]
  const holeRows = useHarpRows(xRange, 'harpface1')
  expect(holeRows.top.length).toBe(2)
  expect(holeRows.bottom.length).toBe(4)
})
