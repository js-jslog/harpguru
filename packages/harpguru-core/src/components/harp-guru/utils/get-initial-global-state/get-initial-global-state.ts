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
  reduceToStaticSizes,
  reduceMatrixToLayoutFacts,
} from '../../../../utils'
import {
  GlobalState,
  DisplayModes,
  ExperienceModes,
  PageNumber,
  FlushChannels,
} from '../../../../types'

// A standalone harp face starts from the setup it is given. The app starts
// each page from its own default.
export type InitialSetup = {
  readonly harpStrataProps: HarpStrataProps
  readonly displayMode: DisplayModes
}

const getDefaultHarpStrataProps = (pageNumber: PageNumber): HarpStrataProps => {
  const { MajorDiatonic: tuningId } = TuningIds
  const { NotValved: valvingId } = ValvingIds
  const { C: harpKeyId } = PitchIds
  const pozitionMap: Record<PageNumber, PozitionIds> = {
    1: PozitionIds.Second,
    2: PozitionIds.Second,
  }
  const { [pageNumber]: pozitionId } = pozitionMap

  const thisPozitionDegrees =
    pageNumber === 1 ? getScale(ScaleIds.MajorPentatonic).degrees : []

  return {
    tuningId,
    valvingId,
    pozitionId,
    harpKeyId,
    activeIds: thisPozitionDegrees,
  }
}

export const getInitialGlobalState = (
  pageNumber: PageNumber,
  initialSetup?: InitialSetup
): GlobalState => {
  const initialHarpStrataProps =
    initialSetup?.harpStrataProps ?? getDefaultHarpStrataProps(pageNumber)
  const { tuningId, valvingId, pozitionId, harpKeyId } = initialHarpStrataProps
  const initialHarpStrata: HarpStrata = getHarpStrata(initialHarpStrataProps)
  const { Explore: initialExperienceMode } = ExperienceModes
  const initialDisplayMode = initialSetup?.displayMode ?? DisplayModes.Degree

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
  const dynamicSizes = reduceLayoutFactsToDynamicSizes(undefined, {
    fullLayoutFacts,
    layoutFacts,
  })
  const staticSizes = reduceToStaticSizes(undefined)

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
