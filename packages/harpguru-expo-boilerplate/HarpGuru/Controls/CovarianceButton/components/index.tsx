import { Button } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { CovarianceButtonProps } from '../types'
import { CovariantMembers } from '../../CovarianceSeries'

const getButtonTitle = (props: CovarianceButtonProps): string => {
  const { lockedType, variedType } = props
  const { harpKeyId, pozitionId, rootPitchId } = props
  if ( lockedType === CovariantMembers.RootPitch && variedType === CovariantMembers.HarpKey ) {
    return `${harpKeyId} ${pozitionId}`
  } else if ( lockedType === CovariantMembers.RootPitch && variedType === CovariantMembers.Pozition ) {
    return `${pozitionId} ${harpKeyId}`
  } else if ( lockedType === CovariantMembers.HarpKey && variedType === CovariantMembers.RootPitch ) {
    return `${rootPitchId} ${pozitionId}`
  } else if ( lockedType === CovariantMembers.HarpKey && variedType === CovariantMembers.Pozition ) {
    return `${pozitionId} ${rootPitchId}`
  } else if ( lockedType === CovariantMembers.Pozition && variedType === CovariantMembers.HarpKey ) {
    return `${harpKeyId} ${rootPitchId}`
  } else if ( lockedType === CovariantMembers.Pozition && variedType === CovariantMembers.RootPitch ) {
    return `${rootPitchId} ${harpKeyId}`
  }

  const errorMessage = `
    Expected lockedType and variedType to constitute a covariant controling pair but didn't.

    ${JSON.stringify({lockedType, variedType, harpKeyId, pozitionId, rootPitchId})}
  `
  throw new Error(errorMessage)
}

const getNewHarpStrata = (props: CovarianceButtonProps): void => {
  const { setActiveHarpStrata } = props
  const { harpKeyId, pozitionId } = props
  const { activeHarpStrata: { apparatus: { id: apparatusId }, isActiveComplex: { activeDegreeIds: activeIds }}} = props
  const harpStrataProps: HarpStrataProps = {
    apparatusId, harpKeyId, pozitionId, activeIds
  }
  const newHarpStrata = getHarpStrata(harpStrataProps)

  setActiveHarpStrata(newHarpStrata)
}

export const CovarianceButton = (props: CovarianceButtonProps): ReactElement => {
  const title = getButtonTitle(props)

  return (
    <Button onPress={(): void => getNewHarpStrata(props)} title={title} />
  )
}
