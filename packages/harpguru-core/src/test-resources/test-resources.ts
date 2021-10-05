import { getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps, ActiveIds } from 'harpstrata'
import {
  TuningIds,
  PitchIds,
  DegreeIds,
  PozitionIds,
  ValvingIds,
} from 'harpparts'

import { DisplayModes, ExperienceModes, FlushChannels } from '../types'
// TODO: fix these imports
import { reduceViewableMatrixToLayoutFacts } from '../components/new-harpstrata-state-callback/utils/reduce-viewablematrix-to-layoutfacts'
// TODO: this function needs renaming. It's param is not a harpstara, it's just a splan matrix.
import { reduceHarpStrataToViewableMatrix } from '../components/new-harpstrata-state-callback/utils/reduce-harpstrata-to-viewablematrix'

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
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const inactiveCellsHarpStrataProps = baseHarpStrataProps
const activeCellsHarpStrataProps = {
  ...baseHarpStrataProps,
  activeIds: allActiveDegrees,
}

export const inactiveCellsHarpStrata = getHarpStrata(
  inactiveCellsHarpStrataProps
)
export const activeCellsHarpStrata = getHarpStrata(activeCellsHarpStrataProps)

type BuildMockUseGlobalImplementationProps = {
  readonly sourceHarpStrata?: HarpStrata
  readonly sourceColumnBounds?: 'FIT' | readonly [number, number]
  readonly experienceMode?: ExperienceModes
  readonly displayMode?: DisplayModes
  readonly bufferedActivityToggles?: ReadonlyArray<DegreeIds>
  readonly fragmentHarpFaceByOctaves?: boolean
  readonly flushChannel?: FlushChannels
  readonly activeQuizDegrees?: ReadonlyArray<DegreeIds>
}

type MockGlobalImplementation = (arg0: string) => unknown[] | undefined

export const buildMockUseGlobalImplementation = ({
  sourceHarpStrata = activeCellsHarpStrata,
  sourceColumnBounds = 'FIT',
  experienceMode = ExperienceModes.Explore,
  displayMode = DisplayModes.Degree,
  bufferedActivityToggles = [],
  fragmentHarpFaceByOctaves = true,
  flushChannel = FlushChannels.Regular,
  activeQuizDegrees = allActiveDegrees,
}: BuildMockUseGlobalImplementationProps): MockGlobalImplementation => {
  const mockGlobal = (stateItem: string) => {
    if (stateItem === 'activeDegreeMatrix')
      return [sourceHarpStrata.degreeMatrix]
    if (stateItem === 'activePitchMatrix') return [sourceHarpStrata.pitchMatrix]
    if (stateItem === 'activeInteractionMatrix')
      return [sourceHarpStrata.apparatus.interactionMatrix]
    if (stateItem === 'activeDegreeIds')
      return [sourceHarpStrata.activeDegreeIds]
    if (stateItem === 'activePitchIds') return [sourceHarpStrata.activePitchIds]
    if (stateItem === 'tuningId') return [sourceHarpStrata.apparatus.tuningId]
    if (stateItem === 'valvingId') return [sourceHarpStrata.apparatus.valvingId]
    if (stateItem === 'harpKeyId') return [sourceHarpStrata.harpKeyId]
    if (stateItem === 'pozitionId') return [sourceHarpStrata.pozitionId]
    if (stateItem === 'rootPitchId') return [sourceHarpStrata.rootPitchId]

    if (stateItem === 'columnBounds') return [sourceColumnBounds]
    const viewableDegreeMatrix = reduceHarpStrataToViewableMatrix(
      sourceHarpStrata.degreeMatrix,
      sourceColumnBounds
    )
    const viewablePitchMatrix = reduceHarpStrataToViewableMatrix(
      sourceHarpStrata.pitchMatrix,
      sourceColumnBounds
    )
    const viewableInteractionMatrix = reduceHarpStrataToViewableMatrix(
      sourceHarpStrata.apparatus.interactionMatrix,
      sourceColumnBounds
    )
    if (stateItem === 'viewableDegreeMatrix') return [viewableDegreeMatrix]
    if (stateItem === 'viewablePitchMatrix') return [viewablePitchMatrix]
    if (stateItem === 'viewableInteractionMatrix')
      return [viewableInteractionMatrix]

    const layoutFacts = reduceViewableMatrixToLayoutFacts(
      viewableInteractionMatrix
    )
    if (stateItem === 'layoutFacts') return [layoutFacts]

    if (stateItem === 'activeExperienceMode') return [experienceMode]
    if (stateItem === 'activeDisplayMode') return [displayMode]
    if (stateItem === 'bufferedActivityToggles')
      return [bufferedActivityToggles]
    if (stateItem === 'fragmentHarpFaceByOctaves')
      return [fragmentHarpFaceByOctaves]
    if (stateItem === 'flushChannel') return [flushChannel]
    if (stateItem === 'activeQuizDegrees') return [activeQuizDegrees]
    return undefined
  }
  return mockGlobal
}
