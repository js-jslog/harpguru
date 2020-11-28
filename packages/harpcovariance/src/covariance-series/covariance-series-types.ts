import { PozitionIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import type { CovariantSet } from '../covariant-set'

export enum CovariantMembers {
  HarpKey = 'harpKeyId',
  Pozition = 'pozitionId',
  RootPitch = 'rootPitchId',
}

export type PozitionByKeyAtRootPrimer = {
  readonly lockedType: CovariantMembers.RootPitch
  readonly variedType: CovariantMembers.HarpKey
  readonly lockedValue: PitchIds
  readonly variedValue: PitchIds
}
export type PozitionByRootAtKeyPrimer = {
  readonly lockedType: CovariantMembers.HarpKey
  readonly variedType: CovariantMembers.RootPitch
  readonly lockedValue: PitchIds
  readonly variedValue: PitchIds
}
export type PozitionCovariancePrimer =
  | PozitionByKeyAtRootPrimer
  | PozitionByRootAtKeyPrimer

export type KeyByPozitionAtRootPrimer = {
  readonly lockedType: CovariantMembers.RootPitch
  readonly variedType: CovariantMembers.Pozition
  readonly lockedValue: PitchIds
  readonly variedValue: PozitionIds
}
export type KeyByRootAtPozitionPrimer = {
  readonly lockedType: CovariantMembers.Pozition
  readonly variedType: CovariantMembers.RootPitch
  readonly lockedValue: PozitionIds
  readonly variedValue: PitchIds
}
export type HarpKeyCovariancePrimer =
  | KeyByPozitionAtRootPrimer
  | KeyByRootAtPozitionPrimer

export type RootByPozitionAtKeyPrimer = {
  readonly lockedType: CovariantMembers.HarpKey
  readonly variedType: CovariantMembers.Pozition
  readonly lockedValue: PitchIds
  readonly variedValue: PozitionIds
}
export type RootByKeyAtPozitionPrimer = {
  readonly lockedType: CovariantMembers.Pozition
  readonly variedType: CovariantMembers.HarpKey
  readonly lockedValue: PozitionIds
  readonly variedValue: PitchIds
}
export type RootPitchCovariancePrimer =
  | RootByPozitionAtKeyPrimer
  | RootByKeyAtPozitionPrimer

export type CovariancePrimer =
  | PozitionCovariancePrimer
  | HarpKeyCovariancePrimer
  | RootPitchCovariancePrimer

export type CovarianceSeries = ReadonlyArray<CovariantSet>
