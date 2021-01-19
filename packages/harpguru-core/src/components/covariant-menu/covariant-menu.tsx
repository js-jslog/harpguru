import { useGlobal, useDispatch } from 'reactn'
import React, { useCallback } from 'react'
import { PozitionIds } from 'harpparts'
import type { CovariancePrimer } from 'harpcovariance'
import { getCovarianceSeries, CovariantMembers } from 'harpcovariance'
import { Feather } from '@expo/vector-icons'

import { MemoOptionStack } from '../option-stack'
import { MenuOpenButton } from '../menu-open-button'
import { MenuFace } from '../menu-face'
import { Menu } from '../menu'
import type { MenuProps } from '../../types'
import { colors, getSizes } from '../../styles'

import { getNewHarpStrataForDispatcher } from './utils'

export const CovariantMenu = (menuProps: MenuProps): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const { harpKeyId } = activeHarpStrata

  const covariancePrimer: CovariancePrimer = {
    lockedType: CovariantMembers.HarpKey,
    variedType: CovariantMembers.Pozition,
    lockedValue: harpKeyId,
    variedValue: PozitionIds.First,
  }
  const covarianceSeries = getCovarianceSeries(covariancePrimer)

  const items = covarianceSeries.map((item) => ({
    label: item.pozitionId,
    callbackParam: { harpKeyId: item.harpKeyId, pozitionId: item.pozitionId },
  }))

  const itemTapHandler = useCallback(
    useDispatch(getNewHarpStrataForDispatcher),
    [useDispatch]
  )

  const useSubTitle = useCallback(() => {
    const [activeHarpStrata] = useGlobal('activeHarpStrata')
    const { harpKeyId } = activeHarpStrata
    return harpKeyId
  }, [useGlobal])

  const sizes = getSizes()

  const optionPropsz = [
    {
      title: 'Harp key',
      useSubTitle,
      items,
      itemTapHandler,
    },
  ]
  return (
    <Menu {...menuProps}>
      <MenuFace {...menuProps}>
        <MemoOptionStack optionPropsz={optionPropsz} />
      </MenuFace>
      <MenuOpenButton {...menuProps}>
        <Feather
          name="sliders"
          size={sizes.labelIconSize}
          color={colors.homeRowsColor}
        />
      </MenuOpenButton>
    </Menu>
  )
}
