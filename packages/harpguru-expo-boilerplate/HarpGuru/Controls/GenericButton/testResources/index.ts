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

const keyCHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.C,
}
const keyDHarpStrataProps: HarpStrataProps = {
  ...baseHarpStrataProps,
  harpKeyId: PitchIds.D,
}

export const firstPozitionHarpStrata: HarpStrata = getHarpStrata(
  firstPozitionHarpStrataProps
)
export const secondPozitionHarpStrata: HarpStrata = getHarpStrata(
  secondPozitionHarpStrataProps
)

export const keyCHarpStrata: HarpStrata = getHarpStrata(keyCHarpStrataProps)
export const keyDHarpStrata: HarpStrata = getHarpStrata(keyDHarpStrataProps)
