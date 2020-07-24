import { ExperienceModes } from '../../../../helpers/setGlobalReactNState'

import { nudgeExperienceMode } from './index'

test('sets the opposite explore mode when active explore mode is Quiz', () => {
  const { Quiz: activeExperienceMode } = ExperienceModes
  const setActiveExperienceMode = jest.fn()
  const partialParams = {
    activeExperienceMode,
    setActiveExperienceMode,
  }
  nudgeExperienceMode(partialParams)

  expect(setActiveExperienceMode.mock.calls[0][0]).toStrictEqual(
    ExperienceModes.Explore
  )
})

test('sets the opposite explore mode when active explore mode is Explore', () => {
  const { Explore: activeExperienceMode } = ExperienceModes
  const setActiveExperienceMode = jest.fn()
  const partialParams = {
    activeExperienceMode,
    setActiveExperienceMode,
  }
  nudgeExperienceMode(partialParams)

  expect(setActiveExperienceMode.mock.calls[0][0]).toStrictEqual(
    ExperienceModes.Quiz
  )
})
