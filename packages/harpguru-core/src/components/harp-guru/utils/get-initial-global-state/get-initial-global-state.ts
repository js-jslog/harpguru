import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import {
  ApparatusIds,
  PozitionIds,
  PitchIds,
  ScaleIds,
  getScale,
  getDegreeIds,
} from 'harpparts'

import {
  GlobalState,
  DisplayModes,
  ExperienceModes,
  PageNumber,
  FlushChannels,
} from '../../../../types'

export const getInitialGlobalState = (pageNumber: PageNumber): GlobalState => {
  const { MajorDiatonic: apparatusId } = ApparatusIds
  const { C: harpKeyId } = PitchIds
  const pozitionMap: Record<PageNumber, PozitionIds> = {
    1: PozitionIds.Second,
    2: PozitionIds.First,
    3: PozitionIds.Third,
  }
  const { [pageNumber]: pozitionId } = pozitionMap

  const initialHarpStrataProps: HarpStrataProps = {
    apparatusId,
    pozitionId,
    harpKeyId,
    activeIds: [],
  }
  const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
  const { Explore: initialExperienceMode } = ExperienceModes
  const { Degree: initialDisplayMode } = DisplayModes

  const thisPozitionDegrees =
    pageNumber === 1 ? getScale(ScaleIds.MajorPentatonic).degrees : []

  const state = {
    activeHarpStrata: initialHarpStrata,
    activeExperienceMode: initialExperienceMode,
    activeDisplayMode: initialDisplayMode,
    bufferedActivityToggles: thisPozitionDegrees,
    fragmentHarpFaceByOctaves: true,
    flushChannel: FlushChannels.Regular,
    activeQuizDegrees: getDegreeIds(),
  }

  return state
}
