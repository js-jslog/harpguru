import { CovariantMembers } from './covariance-series-types'
import type {
  CovariancePrimer,
  HarpKeyCovariancePrimer,
  PozitionCovariancePrimer,
  RootPitchCovariancePrimer,
} from './covariance-series-types'

const containsSpecificCovariantMembers = (
  covariancePrimer: CovariancePrimer,
  covariantMemberOne: CovariantMembers,
  covariantMemberTwo: CovariantMembers
): boolean => {
  const { lockedType, variedType } = covariancePrimer

  const oneWay =
    lockedType === covariantMemberOne && variedType === covariantMemberTwo
  const theOther =
    lockedType === covariantMemberTwo && variedType === covariantMemberOne

  return oneWay || theOther
}

export const isHarpKeyCovariancePrimer = (
  props: CovariancePrimer
): props is HarpKeyCovariancePrimer => {
  const { Pozition, RootPitch } = CovariantMembers

  return containsSpecificCovariantMembers(props, Pozition, RootPitch)
}

export const isPozitionCovariancePrimer = (
  props: CovariancePrimer
): props is PozitionCovariancePrimer => {
  const { HarpKey, RootPitch } = CovariantMembers

  return containsSpecificCovariantMembers(props, HarpKey, RootPitch)
}

export const isRootPitchCovariancePrimer = (
  props: CovariancePrimer
): props is RootPitchCovariancePrimer => {
  const { HarpKey, Pozition } = CovariantMembers

  return containsSpecificCovariantMembers(props, HarpKey, Pozition)
}
