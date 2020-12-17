import { useGlobal } from 'reactn'

import { DisplayModes } from '../../../../types'

import { useNudgeDisplayMode } from './use-nudge-display-mode'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('sets the opposite display mode when input DisplayMode is Pitch', () => {
  const setActiveDisplayMode = jest.fn()
  mockUseGlobal.mockReturnValue([DisplayModes.Pitch, setActiveDisplayMode])
  const nudgeDisplayMode = useNudgeDisplayMode()
  nudgeDisplayMode('DOWN')

  expect(setActiveDisplayMode.mock.calls[0][0]).toStrictEqual(
    DisplayModes.Degree
  )
})

test('sets the opposite display mode when input DisplayMode is Degree', () => {
  const setActiveDisplayMode = jest.fn()
  mockUseGlobal.mockReturnValue([DisplayModes.Degree, setActiveDisplayMode])
  const nudgeDisplayMode = useNudgeDisplayMode()
  nudgeDisplayMode('DOWN')

  expect(setActiveDisplayMode.mock.calls[0][0]).toStrictEqual(
    DisplayModes.Pitch
  )
})
