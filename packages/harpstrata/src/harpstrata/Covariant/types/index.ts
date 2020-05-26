import type { PozitionIds } from '../../Pozition'
import type { PitchIds } from '../../Pitch'

export type HarpKeyControlVars = {
  readonly rootPitchId: PitchIds;
  readonly pozitionId: PozitionIds;
}

export type PozitionControlVars = {
  readonly rootPitchId: PitchIds;
  readonly harpKeyId: PitchIds;
}

export type RootPitchControlVars = {
  readonly harpKeyId: PitchIds;
  readonly pozitionId: PozitionIds;
}

export type CovariantControlVars = HarpKeyControlVars | RootPitchControlVars | PozitionControlVars
export const isHarpKeyControlVars = (props: CovariantControlVars): props is HarpKeyControlVars => {
  const hasRootPitch = (props as HarpKeyControlVars).rootPitchId !== undefined
  const hasPozition = (props as HarpKeyControlVars).pozitionId !== undefined

  return hasRootPitch && hasPozition
}
export const isPozitionControlVars = (props: CovariantControlVars): props is PozitionControlVars => {
  const hasRootPitch = (props as PozitionControlVars).rootPitchId !== undefined
  const hasHarpKey = (props as PozitionControlVars).harpKeyId !== undefined

  return hasRootPitch && hasHarpKey
}
export const isRootPitchControlVars = (props: CovariantControlVars): props is RootPitchControlVars => {
  const hasHarpKey = (props as RootPitchControlVars).harpKeyId !== undefined
  const hasPozition = (props as RootPitchControlVars).pozitionId !== undefined

  return hasHarpKey && hasPozition
}

export type CovariantGroup = {
  readonly harpKeyId: PitchIds;
  readonly pozitionId: PozitionIds;
  readonly rootPitchId: PitchIds;
}
