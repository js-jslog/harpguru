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
  reduceLayoutFactsToDynamicSizes,
  reduceLayoutFactsToStaticSizes,
  reduceMatrixToLayoutFacts,
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

  const thisPozitionDegrees =
    pageNumber === 1 ? getScale(ScaleIds.MajorPentatonic).degrees : []

  const initialHarpStrataProps: HarpStrataProps = {
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: thisPozitionDegrees,
  }
  const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
  const { Explore: initialExperienceMode } = ExperienceModes
  const { Degree: initialDisplayMode } = DisplayModes

  const { rootPitchId, activeDegreeIds, activePitchIds } = initialHarpStrata
  const {
    apparatus: { interactionMatrix: fullInteractionMatrix },
  } = initialHarpStrata
  const { degreeMatrix: fullDegreeMatrix } = initialHarpStrata
  const { pitchMatrix: fullPitchMatrix } = initialHarpStrata
  const columnBounds = 'FIT'
  const viewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    fullInteractionMatrix,
    fullInteractionMatrix,
    columnBounds
  )
  const viewableDegreeMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    fullDegreeMatrix,
    fullInteractionMatrix,
    columnBounds
  )
  const viewablePitchMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    fullPitchMatrix,
    fullInteractionMatrix,
    columnBounds
  )
  const fullLayoutFacts = reduceMatrixToLayoutFacts(
    {
      harpface1: {
        harpfaceColumns: 0,
        harpfaceRows: 0,
      },
    },
    fullInteractionMatrix
  )
  const layoutFacts = reduceMatrixToLayoutFacts(
    {
      harpface1: {
        harpfaceColumns: 0,
        harpfaceRows: 0,
      },
    },
    viewableInteractionMatrix
  )
  const dynamicSizes = reduceLayoutFactsToDynamicSizes(
    undefined,
    layoutFacts,
    columnBounds
  )
  const staticSizes = reduceLayoutFactsToStaticSizes(undefined, layoutFacts)

  const state = {
    activeHarpStrata: initialHarpStrata,
    activeExperienceMode: initialExperienceMode,
    activeDisplayMode: initialDisplayMode,
    bufferedActivityToggles: [],
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
    activeDegreeIds,
    activePitchIds,
    viewableInteractionMatrix,
    viewableDegreeMatrix,
    viewablePitchMatrix,
    pozitionId,
    rootPitchId,
    harpKeyId,
    fullLayoutFacts,
    layoutFacts,
    dynamicSizes,
    staticSizes,
  } as const

  return state
}
