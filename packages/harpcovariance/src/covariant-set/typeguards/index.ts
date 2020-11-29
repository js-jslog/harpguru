import type {
  CovariantControllers,
  HarpKeyControllers,
  PozitionControllers,
  RootPitchControllers,
} from '../types'

export const areHarpKeyControllers = (
  props: CovariantControllers
): props is HarpKeyControllers => {
  const hasRootPitch = (props as HarpKeyControllers).rootPitchId !== undefined
  const hasPozition = (props as HarpKeyControllers).pozitionId !== undefined

  return hasRootPitch && hasPozition
}
export const arePozitionControllers = (
  props: CovariantControllers
): props is PozitionControllers => {
  const hasRootPitch = (props as PozitionControllers).rootPitchId !== undefined
  const hasHarpKey = (props as PozitionControllers).harpKeyId !== undefined

  return hasRootPitch && hasHarpKey
}
export const areRootPitchControllers = (
  props: CovariantControllers
): props is RootPitchControllers => {
  const hasHarpKey = (props as RootPitchControllers).harpKeyId !== undefined
  const hasPozition = (props as RootPitchControllers).pozitionId !== undefined

  return hasHarpKey && hasPozition
}
