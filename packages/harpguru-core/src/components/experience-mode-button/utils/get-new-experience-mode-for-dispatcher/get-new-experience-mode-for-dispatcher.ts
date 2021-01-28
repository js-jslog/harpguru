import { ExperienceModes } from '../../../../types'

export const getNewExperienceModeForDispatcher = (
  activeExperienceMode: ExperienceModes
): ExperienceModes => {
  const { Explore, Quiz } = ExperienceModes

  const newExperienceMode = activeExperienceMode === Quiz ? Explore : Quiz

  return newExperienceMode
}
