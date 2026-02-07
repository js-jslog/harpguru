import { useHarpGuruStore } from '../../../../store'

import { useToggleFragmentHarpFace } from './use-toggle-fragment-harpface'

jest.mock('../../../../store', () => ({ useHarpGuruStore: jest.fn() }))
const mockUseHarpGuruStore = useHarpGuruStore as jest.Mock

test('sets the opposite harpface fragmentation when fragmentation is true', () => {
  const setFragmentHarpFace = jest.fn()
  mockUseHarpGuruStore.mockImplementation((selector: any) =>
    selector({
      fragmentHarpFaceByOctaves: true,
      setFragmentHarpFaceByOctaves: setFragmentHarpFace,
    })
  )

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(setFragmentHarpFace.mock.calls[0][0]).toBeFalsy()
})

test('sets the opposite harpface fragmentation when fragmentation is false', () => {
  const setFragmentHarpFace = jest.fn()
  mockUseHarpGuruStore.mockImplementation((selector: any) =>
    selector({
      fragmentHarpFaceByOctaves: false,
      setFragmentHarpFaceByOctaves: setFragmentHarpFace,
    })
  )

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(setFragmentHarpFace.mock.calls[0][0]).toBeTruthy()
})
