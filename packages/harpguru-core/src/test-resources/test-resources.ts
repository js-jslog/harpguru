import { getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps } from 'harpstrata'
import {
  TuningIds,
  PitchIds,
  DegreeIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import {
  reduceFullMatrixToViewableMatrix,
  reduceLayoutFactsToDynamicSizes,
  reduceToStaticSizes,
  reduceMatrixToLayoutFacts,
} from '../utils'
import { DisplayModes, ExperienceModes, FlushChannels } from '../types'
import type { ColumnBounds } from '../types'

const allActiveDegrees = [
  DegreeIds.Root,
  DegreeIds.Flat2,
  DegreeIds.Second,
  DegreeIds.Flat3,
  DegreeIds.Third,
  DegreeIds.Fourth,
  DegreeIds.Flat5,
  DegreeIds.Fifth,
  DegreeIds.Flat6,
  DegreeIds.Sixth,
  DegreeIds.Flat7,
  DegreeIds.Seventh,
]

const baseHarpStrataProps: HarpStrataProps = {
  tuningId: TuningIds.MajorDiatonic,
  valvingId: ValvingIds.NotValved,
  pozitionId: PozitionIds.Second,
  harpKeyId: PitchIds.C,
  activeIds: [] as const,
}
const inactiveCellsHarpStrataProps = baseHarpStrataProps
const activeCellsHarpStrataProps = {
  ...baseHarpStrataProps,
  activeIds: allActiveDegrees,
}
const chromaticHarpStrataProps = {
  ...baseHarpStrataProps,
  tuningId: TuningIds.SixteenHoleChromatic,
}

export const inactiveCellsHarpStrata = getHarpStrata(
  inactiveCellsHarpStrataProps
)
export const activeCellsHarpStrata = getHarpStrata(activeCellsHarpStrataProps)
export const chromaticHarpStrata = getHarpStrata(chromaticHarpStrataProps)

type BuildMockStoreStateProps = {
  readonly sourceHarpStrata?: HarpStrata
  readonly sourceColumnBounds?: ColumnBounds
  readonly experienceMode?: ExperienceModes
  readonly displayMode?: DisplayModes
  readonly bufferedActivityToggles?: ReadonlyArray<DegreeIds>
  readonly fragmentHarpFaceByOctaves?: boolean
  readonly flushChannel?: FlushChannels
  readonly activeQuizDegrees?: ReadonlyArray<DegreeIds>
}

export const buildMockStoreState = ({
  sourceHarpStrata = activeCellsHarpStrata,
  sourceColumnBounds = 'FIT',
  experienceMode = ExperienceModes.Explore,
  displayMode = DisplayModes.Degree,
  bufferedActivityToggles = [],
  fragmentHarpFaceByOctaves = true,
  flushChannel = FlushChannels.Regular,
  activeQuizDegrees = allActiveDegrees,
}: BuildMockStoreStateProps) => {
  const viewableDegreeMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    sourceHarpStrata.degreeMatrix,
    sourceHarpStrata.apparatus.interactionMatrix,
    sourceColumnBounds
  )
  const viewablePitchMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    sourceHarpStrata.pitchMatrix,
    sourceHarpStrata.apparatus.interactionMatrix,
    sourceColumnBounds
  )
  const viewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    { harpface1: [[]] },
    sourceHarpStrata.apparatus.interactionMatrix,
    sourceHarpStrata.apparatus.interactionMatrix,
    sourceColumnBounds
  )
  const fullLayoutFacts = reduceMatrixToLayoutFacts(
    {
      harpface1: {
        harpfaceColumns: 0,
        harpfaceRows: 0,
      },
    },
    sourceHarpStrata.apparatus.interactionMatrix
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

  return {
    activeHarpStrata: sourceHarpStrata,
    activeDegreeMatrix: sourceHarpStrata.degreeMatrix,
    activePitchMatrix: sourceHarpStrata.pitchMatrix,
    activeInteractionMatrix: sourceHarpStrata.apparatus.interactionMatrix,
    activeDegreeIds: sourceHarpStrata.activeDegreeIds,
    activePitchIds: sourceHarpStrata.activePitchIds,
    tuningId: sourceHarpStrata.apparatus.tuningId,
    valvingId: sourceHarpStrata.apparatus.valvingId,
    harpKeyId: sourceHarpStrata.harpKeyId,
    pozitionId: sourceHarpStrata.pozitionId,
    rootPitchId: sourceHarpStrata.rootPitchId,
    sourceColumnBounds,
    columnBounds: sourceColumnBounds,
    viewableDegreeMatrix,
    viewablePitchMatrix,
    viewableInteractionMatrix,
    fullLayoutFacts,
    layoutFacts,
    dynamicSizes,
    staticSizes,
    activeExperienceMode: experienceMode,
    activeDisplayMode: displayMode,
    bufferedActivityToggles,
    fragmentHarpFaceByOctaves,
    flushChannel,
    activeQuizDegrees,
    setActiveHarpStrata: jest.fn(),
    setActiveExperienceMode: jest.fn(),
    setActiveDisplayMode: jest.fn(),
    setBufferedActivityToggles: jest.fn(),
    setFragmentHarpFaceByOctaves: jest.fn(),
    setFlushChannel: jest.fn(),
    setActiveQuizDegrees: jest.fn(),
    setSourceColumnBounds: jest.fn(),
    setColumnBounds: jest.fn(),
    setTuningId: jest.fn(),
    setValvingId: jest.fn(),
    setActiveInteractionMatrix: jest.fn(),
    setActiveDegreeMatrix: jest.fn(),
    setActivePitchMatrix: jest.fn(),
    setActiveDegreeIds: jest.fn(),
    setActivePitchIds: jest.fn(),
    setPozitionId: jest.fn(),
    setRootPitchId: jest.fn(),
    setHarpKeyId: jest.fn(),
    setViewableInteractionMatrix: jest.fn(),
    setViewableDegreeMatrix: jest.fn(),
    setViewablePitchMatrix: jest.fn(),
    setFullLayoutFacts: jest.fn(),
    setLayoutFacts: jest.fn(),
    setDynamicSizes: jest.fn(),
    setStaticSizes: jest.fn(),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectorFn = (state: any) => any

export const mockStoreImplementation = (
  props: BuildMockStoreStateProps
): ((selector: SelectorFn) => unknown) => {
  const state = buildMockStoreState(props)
  return (selector: SelectorFn) => selector(state)
}
