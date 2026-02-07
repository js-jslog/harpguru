import { createStore } from 'zustand'
import type { HarpStrata } from 'harpstrata'
import type {
  DegreeIds,
  HarpFaceFacts,
  HarpFaceMatrices,
  Interaction,
  Degree,
  Pitch,
  PitchIds,
  PozitionIds,
  TuningIds,
  ValvingIds,
} from 'harpparts'

import type {
  ColumnBounds,
  DisplayModes,
  ExperienceModes,
  FlushChannels,
  LayoutFacts,
  PageNumber,
  SizeScheme,
} from '../types'
import { getInitialGlobalState } from '../components/harp-guru/utils'

export type HarpGuruState = {
  readonly activeHarpStrata: HarpStrata
  readonly activeExperienceMode: ExperienceModes
  readonly activeDisplayMode: DisplayModes
  readonly bufferedActivityToggles: ReadonlyArray<DegreeIds>
  readonly fragmentHarpFaceByOctaves: boolean
  readonly flushChannel: FlushChannels
  readonly activeQuizDegrees: ReadonlyArray<DegreeIds>
  readonly sourceColumnBounds: ColumnBounds
  readonly columnBounds: ColumnBounds
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly activeInteractionMatrix: HarpFaceMatrices<Interaction>
  readonly activeDegreeMatrix: HarpFaceMatrices<Degree>
  readonly activePitchMatrix: HarpFaceMatrices<Pitch>
  readonly activeDegreeIds: ReadonlyArray<DegreeIds>
  readonly activePitchIds: ReadonlyArray<PitchIds>
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
  readonly viewableInteractionMatrix: HarpFaceMatrices<Interaction>
  readonly viewableDegreeMatrix: HarpFaceMatrices<Degree>
  readonly viewablePitchMatrix: HarpFaceMatrices<Pitch>
  readonly fullLayoutFacts: HarpFaceFacts<LayoutFacts>
  readonly layoutFacts: HarpFaceFacts<LayoutFacts>
  readonly dynamicSizes: SizeScheme
  readonly staticSizes: SizeScheme
}

export type HarpGuruActions = {
  readonly setActiveHarpStrata: (value: HarpStrata) => void
  readonly setActiveExperienceMode: (value: ExperienceModes) => void
  readonly setActiveDisplayMode: (value: DisplayModes) => void
  readonly setBufferedActivityToggles: (
    value: ReadonlyArray<DegreeIds>
  ) => void
  readonly setFragmentHarpFaceByOctaves: (value: boolean) => void
  readonly setFlushChannel: (value: FlushChannels) => void
  readonly setActiveQuizDegrees: (value: ReadonlyArray<DegreeIds>) => void
  readonly setSourceColumnBounds: (value: ColumnBounds) => void
  readonly setColumnBounds: (value: ColumnBounds) => void
  readonly setTuningId: (value: TuningIds) => void
  readonly setValvingId: (value: ValvingIds) => void
  readonly setActiveInteractionMatrix: (
    value: HarpFaceMatrices<Interaction>
  ) => void
  readonly setActiveDegreeMatrix: (value: HarpFaceMatrices<Degree>) => void
  readonly setActivePitchMatrix: (value: HarpFaceMatrices<Pitch>) => void
  readonly setActiveDegreeIds: (value: ReadonlyArray<DegreeIds>) => void
  readonly setActivePitchIds: (value: ReadonlyArray<PitchIds>) => void
  readonly setPozitionId: (value: PozitionIds) => void
  readonly setRootPitchId: (value: PitchIds) => void
  readonly setHarpKeyId: (value: PitchIds) => void
  readonly setViewableInteractionMatrix: (
    value: HarpFaceMatrices<Interaction>
  ) => void
  readonly setViewableDegreeMatrix: (value: HarpFaceMatrices<Degree>) => void
  readonly setViewablePitchMatrix: (value: HarpFaceMatrices<Pitch>) => void
  readonly setFullLayoutFacts: (value: HarpFaceFacts<LayoutFacts>) => void
  readonly setLayoutFacts: (value: HarpFaceFacts<LayoutFacts>) => void
  readonly setDynamicSizes: (value: SizeScheme) => void
  readonly setStaticSizes: (value: SizeScheme) => void
}

export type HarpGuruStore = HarpGuruState & HarpGuruActions

export const createHarpGuruStore = (pageNumber: PageNumber) => {
  const initialState = getInitialGlobalState(pageNumber)

  return createStore<HarpGuruStore>()((set) => ({
    ...initialState,
    setActiveHarpStrata: (value) => set({ activeHarpStrata: value }),
    setActiveExperienceMode: (value) => set({ activeExperienceMode: value }),
    setActiveDisplayMode: (value) => set({ activeDisplayMode: value }),
    setBufferedActivityToggles: (value) =>
      set({ bufferedActivityToggles: value }),
    setFragmentHarpFaceByOctaves: (value) =>
      set({ fragmentHarpFaceByOctaves: value }),
    setFlushChannel: (value) => set({ flushChannel: value }),
    setActiveQuizDegrees: (value) => set({ activeQuizDegrees: value }),
    setSourceColumnBounds: (value) => set({ sourceColumnBounds: value }),
    setColumnBounds: (value) => set({ columnBounds: value }),
    setTuningId: (value) => set({ tuningId: value }),
    setValvingId: (value) => set({ valvingId: value }),
    setActiveInteractionMatrix: (value) =>
      set({ activeInteractionMatrix: value }),
    setActiveDegreeMatrix: (value) => set({ activeDegreeMatrix: value }),
    setActivePitchMatrix: (value) => set({ activePitchMatrix: value }),
    setActiveDegreeIds: (value) => set({ activeDegreeIds: value }),
    setActivePitchIds: (value) => set({ activePitchIds: value }),
    setPozitionId: (value) => set({ pozitionId: value }),
    setRootPitchId: (value) => set({ rootPitchId: value }),
    setHarpKeyId: (value) => set({ harpKeyId: value }),
    setViewableInteractionMatrix: (value) =>
      set({ viewableInteractionMatrix: value }),
    setViewableDegreeMatrix: (value) => set({ viewableDegreeMatrix: value }),
    setViewablePitchMatrix: (value) => set({ viewablePitchMatrix: value }),
    setFullLayoutFacts: (value) => set({ fullLayoutFacts: value }),
    setLayoutFacts: (value) => set({ layoutFacts: value }),
    setDynamicSizes: (value) => set({ dynamicSizes: value }),
    setStaticSizes: (value) => set({ staticSizes: value }),
  }))
}

export type HarpGuruStoreInstance = ReturnType<typeof createHarpGuruStore>
