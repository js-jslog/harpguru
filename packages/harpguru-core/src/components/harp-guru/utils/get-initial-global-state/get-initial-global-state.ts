import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, HarpStrata } from 'harpstrata'
import {
  TuningIds,
  PozitionIds,
  PitchIds,
  ScaleIds,
  getScale,
  getDegreeIds,
  ValvingIds,
} from 'harpparts'

import {
  GlobalState,
  DisplayModes,
  ExperienceModes,
  PageNumber,
  FlushChannels,
} from '../../../../types'

export const getInitialGlobalState = (pageNumber: PageNumber): GlobalState => {
  const { MajorDiatonic: tuningId } = TuningIds
  const { NotValved: valvingId } = ValvingIds
  const { C: harpKeyId } = PitchIds
  const pozitionMap: Record<PageNumber, PozitionIds> = {
    1: PozitionIds.Second,
    2: PozitionIds.First,
    3: PozitionIds.Third,
  }
  const { [pageNumber]: pozitionId } = pozitionMap

  const initialHarpStrataProps: HarpStrataProps = {
    tuningId,
    valvingId,
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
    columnBounds: 'FIT',
    tuningId: initialHarpStrata.apparatus.tuningId,
    valvingId: initialHarpStrata.apparatus.valvingId,
    activeInteractionMatrix: initialHarpStrata.apparatus.interactionMatrix,
    activeDegreeMatrix: initialHarpStrata.degreeMatrix,
    activePitchMatrix: initialHarpStrata.pitchMatrix,
    activeDegreeIds: [],
    activePitchIds: [],
    viewableInteractionMatrix: initialHarpStrata.apparatus.interactionMatrix,
    viewableDegreeMatrix: initialHarpStrata.degreeMatrix,
    viewablePitchMatrix: initialHarpStrata.pitchMatrix,
    pozitionId: initialHarpStrata.pozitionId,
    rootPitchId: initialHarpStrata.rootPitchId,
    harpKeyId: initialHarpStrata.harpKeyId,
    // TODO: This and many other parts of this state should
    // be derived rather than stated outright.
    layoutFacts: {
      harpfaceColumns: 10,
      harpfaceRows: 7,
    },
  } as const

  return state
}
