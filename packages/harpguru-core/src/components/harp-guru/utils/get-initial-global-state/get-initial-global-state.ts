import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import {
  ApparatusIds,
  PozitionIds,
  DegreeIds,
  PitchIds,
  ScaleIds,
  getScale,
} from 'harpparts'
import { CovariantMembers } from 'harpcovariance'

import { DisplayModes, ExperienceModes } from '../../../../types'

type GlobalState = {
  activeHarpStrata: HarpStrata
  activeExperienceMode: ExperienceModes
  activeDisplayMode: DisplayModes
  lockedCovariant: CovariantMembers
  bufferedActivityToggles: ReadonlyArray<DegreeIds>
}

export const getInitialGlobalState = (pageNumber: 1 | 2 | 3): GlobalState => {
  const { MajorDiatonic: apparatusId } = ApparatusIds
  const { C: harpKeyId } = PitchIds
  const pozitionMap: Record<1 | 2 | 3, PozitionIds> = {
    1: PozitionIds.Second,
    2: PozitionIds.First,
    3: PozitionIds.Third,
  }
  const { [pageNumber]: pozitionId } = pozitionMap

  // The idea of what happens next is that since the 12 bar blues will be
  // the most common use case, I want the 3 pages to represent the I, IV & V
  // chords in 2nd, 1st & 3rd positions respectively, with the notes of the
  // major pentatonic of the I chord highlighted in all of them.
  // Basically for the benefits illustrated in https://youtu.be/ZyNb39rPpng
  const { activePitchIds: pentatonicPitches2ndPoz } = getHarpStrata({
    apparatusId,
    pozitionId: PozitionIds.Second,
    harpKeyId,
    activeIds: getScale(ScaleIds.MajorPentatonic).degrees,
  })

  const { activeDegreeIds: thisPozitionDegrees } = getHarpStrata({
    apparatusId,
    pozitionId,
    harpKeyId,
    activeIds: pentatonicPitches2ndPoz,
  })

  const initialHarpStrataProps: HarpStrataProps = {
    apparatusId,
    pozitionId,
    harpKeyId,
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
    bufferedActivityToggles: thisPozitionDegrees,
  }

  return state
}
