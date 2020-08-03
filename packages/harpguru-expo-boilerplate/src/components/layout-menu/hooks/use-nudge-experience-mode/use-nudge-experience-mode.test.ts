import { useGlobal } from 'reactn'

import { ExperienceModes } from '../../../../types'

import { useNudgeExperienceMode } from './use-nudge-experience-mode'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('sets the opposite explore mode when active explore mode is Quiz', () => {
  const setActiveExperienceMode = jest.fn()
  mockUseGlobal.mockReturnValue([ExperienceModes.Quiz, setActiveExperienceMode])
  const nudgeExperienceMode = useNudgeExperienceMode()
  nudgeExperienceMode('DOWN')

  expect(setActiveExperienceMode.mock.calls[0][0]).toStrictEqual(
    ExperienceModes.Explore
  )
})

test('sets the opposite explore mode when active explore mode is Explore', () => {
  const setActiveExperienceMode = jest.fn()
  mockUseGlobal.mockReturnValue([
    ExperienceModes.Explore,
    setActiveExperienceMode,
  ])
  const nudgeExperienceMode = useNudgeExperienceMode()
  nudgeExperienceMode('DOWN')

  expect(setActiveExperienceMode.mock.calls[0][0]).toStrictEqual(
    ExperienceModes.Quiz
  )
})
