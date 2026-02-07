import { buildMockStoreState } from '../../../../test-resources'
import { useHarpGuruStore } from '../../../../store'

import { useToggleFragmentHarpFace } from './use-toggle-fragment-harpface'

jest.mock('../../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('sets the opposite harpface fragmentation when fragmentation is true', () => {
  const mockState = buildMockStoreState({ fragmentHarpFaceByOctaves: true })
  mockUseHarpGuruStore.mockImplementation(
    (selector: (s: typeof mockState) => unknown) => selector(mockState)
  )

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(
    (mockState.setFragmentHarpFaceByOctaves as jest.Mock).mock.calls[0][0]
  ).toBeFalsy()
})

test('sets the opposite harpface fragmentation when fragmentation is false', () => {
  const mockState = buildMockStoreState({ fragmentHarpFaceByOctaves: false })
  mockUseHarpGuruStore.mockImplementation(
    (selector: (s: typeof mockState) => unknown) => selector(mockState)
  )

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(
    (mockState.setFragmentHarpFaceByOctaves as jest.Mock).mock.calls[0][0]
  ).toBeTruthy()
})
