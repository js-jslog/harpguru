import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, ActiveIds } from 'harpstrata'
import { ApparatusIds, PitchIds, DegreeIds, PozitionIds } from 'harpparts'

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
  tuningId: ApparatusIds.MajorDiatonic,
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
