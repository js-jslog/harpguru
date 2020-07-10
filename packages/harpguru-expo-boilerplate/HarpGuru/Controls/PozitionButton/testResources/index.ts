import { ApparatusIds, PozitionIds, PitchIds, getHarpStrata } from 'harpstrata'
import type { HarpStrata, HarpStrataProps, ActiveIds } from 'harpstrata'

const baseHarpStrataProps: HarpStrataProps = {
  apparatusId: ApparatusIds.MajorDiatonic,
  pozitionId: PozitionIds.First,
  harpKeyId: PitchIds.C,
  activeIds: [] as ActiveIds,
}
const firstPozitionHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.First,
}
const secondPozitionHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  pozitionId: PozitionIds.Second,
}

export const firstPozitionHarpStrata: HarpStrata = getHarpStrata(
  firstPozitionHarpStrataProps
)
export const secondPozitionHarpStrata: HarpStrata = getHarpStrata(
  secondPozitionHarpStrataProps
)
