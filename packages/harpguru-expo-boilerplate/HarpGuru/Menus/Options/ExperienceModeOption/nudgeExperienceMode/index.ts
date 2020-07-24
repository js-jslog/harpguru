import { ExperienceModes } from '../../../../helpers/setGlobalReactNState'

type Props = {
  readonly activeExperienceMode: ExperienceModes
  readonly setActiveExperienceMode: (arg0: ExperienceModes) => void
}

export const nudgeExperienceMode = (partialParams: Props): void => {
  const { activeExperienceMode, setActiveExperienceMode } = partialParams

  if (activeExperienceMode === ExperienceModes.Quiz) {
    setActiveExperienceMode(ExperienceModes.Explore)
  } else {
    setActiveExperienceMode(ExperienceModes.Quiz)
  }
}
