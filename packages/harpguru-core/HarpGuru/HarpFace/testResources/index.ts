import {
  ApparatusIds,
  PozitionIds,
  PitchIds,
  DegreeIds,
  getHarpStrata,
} from 'harpstrata'
import type { HarpStrata, HarpStrataProps, ActiveIds } from 'harpstrata'

import { DisplayModes } from '../../types'

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
const { Degree: activeDisplayMode } = DisplayModes
// TODO: If I add a jest.fn() here rather than this nonesense function
// the gradle build fails. I need to figure out to make the testResources
// folders ignored in the build
const setActiveHarpStrata = (activeHarpStrata: HarpStrata): void => {
  console.log(activeHarpStrata)
}

const baseHarpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const inactiveCellsHarpStrataProps = baseHarpStrataProps
const activeCellsHarpStrataProps = {
  ...baseHarpStrataProps,
  activeIds: allActiveDegrees,
}

const inactiveCellsHarpStrata = getHarpStrata(inactiveCellsHarpStrataProps)
const activeCellsHarpStrata = getHarpStrata(activeCellsHarpStrataProps)

export const inactiveCellsHarpFaceProps = {
  activeHarpStrata: inactiveCellsHarpStrata,
  activeDisplayMode,
  setActiveHarpStrata,
}
export const activeCellsHarpFaceProps = {
  activeHarpStrata: activeCellsHarpStrata,
  activeDisplayMode,
  setActiveHarpStrata,
}
export const harpFaceProps = inactiveCellsHarpFaceProps
