import { ExperienceModes } from '../../../../types'

import { getNewExperienceModeForDispatcher } from './get-new-experience-mode-for-dispatcher'

test('returns Quiz when input activeExperienceMode is Explore', () => {
  const newExperienceMode = getNewExperienceModeForDispatcher(
    ExperienceModes.Explore
  )

  expect(newExperienceMode).toBe(ExperienceModes.Quiz)
})

test('returns Explore when input activeExperienceMode is Quiz', () => {
  const newExperienceMode = getNewExperienceModeForDispatcher(
    ExperienceModes.Quiz
  )

  expect(newExperienceMode).toBe(ExperienceModes.Explore)
})
