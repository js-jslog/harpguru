import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import { ApparatusIds, DegreeIds, PitchIds, PozitionIds } from 'harpparts'
import { CovariantMembers } from 'harpcovariance'

import { DisplayModes, ExperienceModes } from '../../../../types'

type GlobalState = {
  activeHarpStrata: HarpStrata
  activeExperienceMode: ExperienceModes
  activeDisplayMode: DisplayModes
  lockedCovariant: CovariantMembers
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
}

export const getInitialGlobalState = (): GlobalState => {
  const initialHarpStrataProps: HarpStrataProps = {
    apparatusId: ApparatusIds.MajorDiatonic,
    pozitionId: PozitionIds.Second,
    harpKeyId: PitchIds.C,
    activeIds: [],
  }
  const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
  const { Explore: initialExperienceMode } = ExperienceModes
  const { Degree: initialDisplayMode } = DisplayModes
  const { Pozition: initialLockedCovariant } = CovariantMembers

  const state = {
    activeHarpStrata: initialHarpStrata,
    activeExperienceMode: initialExperienceMode,
    activeDisplayMode: initialDisplayMode,
    lockedCovariant: initialLockedCovariant,
    bufferedActivityToggles: [
      DegreeIds.Root,
      DegreeIds.Second,
      DegreeIds.Third,
      DegreeIds.Fifth,
      DegreeIds.Sixth,
    ],
  }
  return state
}
