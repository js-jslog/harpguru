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
  reduceFullMatrixToViewableMatrix,
  reduceViewableMatrixToLayoutFacts,
} from '../../../../utils'
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

  const { rootPitchId } = initialHarpStrata
  const {
    apparatus: { interactionMatrix: fullInteractionMatrix },
  } = initialHarpStrata
  const { degreeMatrix: fullDegreeMatrix } = initialHarpStrata
  const { pitchMatrix: fullPitchMatrix } = initialHarpStrata
  const columnBounds = 'FIT'
  const viewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    fullInteractionMatrix,
    columnBounds
  )
  const viewableDegreeMatrix = reduceFullMatrixToViewableMatrix(
    fullDegreeMatrix,
    columnBounds
  )
  const viewablePitchMatrix = reduceFullMatrixToViewableMatrix(
    fullPitchMatrix,
    columnBounds
  )
  const layoutFacts = reduceViewableMatrixToLayoutFacts(
    viewableInteractionMatrix
  )

  const state = {
    activeHarpStrata: initialHarpStrata,
    activeExperienceMode: initialExperienceMode,
    activeDisplayMode: initialDisplayMode,
    bufferedActivityToggles: thisPozitionDegrees,
    fragmentHarpFaceByOctaves: true,
    flushChannel: FlushChannels.Regular,
    activeQuizDegrees: getDegreeIds(),
    sourceColumnBounds: columnBounds,
    columnBounds,
    tuningId,
    valvingId,
    activeInteractionMatrix: fullInteractionMatrix,
    activeDegreeMatrix: fullDegreeMatrix,
    activePitchMatrix: fullPitchMatrix,
    activeDegreeIds: [],
    activePitchIds: [],
    viewableInteractionMatrix,
    viewableDegreeMatrix,
    viewablePitchMatrix,
    pozitionId,
    rootPitchId,
    harpKeyId,
    layoutFacts,
  } as const

  return state
}
