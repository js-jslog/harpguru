import { DisplayModes } from '../../../../types'

import { getNewDisplayModeForDispatcher } from './get-new-display-mode-for-dispatcher'

test('returns Degree when input DisplayMode is Pitch', () => {
  const newActiveDisplayMode = getNewDisplayModeForDispatcher(
    DisplayModes.Pitch
  )

  expect(newActiveDisplayMode).toBe(DisplayModes.Degree)
})

test('returns Pitch when input DisplayMode is Degree', () => {
  const newActiveDisplayMode = getNewDisplayModeForDispatcher(
    DisplayModes.Degree
  )

  expect(newActiveDisplayMode).toStrictEqual(DisplayModes.Pitch)
})
