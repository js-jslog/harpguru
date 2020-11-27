import { setGlobal } from 'reactn'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import { ApparatusIds, DegreeIds, PitchIds, PozitionIds } from 'harpparts'

import { DisplayModes, ExperienceModes } from '../../types'
import { CovariantMembers } from '../../packages/covariance-series'

import { espyGlobalTuple } from './state-informant'

export const setGlobalState = (): void => {
  const { globalTuple } = espyGlobalTuple()
  if (globalTuple[0].activeHarpStrata !== undefined) return

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
  setGlobal(state)
}
