import React from 'react'
import type { ReactElement } from 'react'

import { CovarianceButtonListProps } from '../types'
import { getCovarianceSeries } from '../../CovarianceSeries'
import type { CovariancePrimer } from '../../CovarianceSeries'
import { CovarianceButton } from '../../CovarianceButton'

const getCovarianceButtons = (
  props: CovarianceButtonListProps
): ReadonlyArray<ReactElement> => {
  const { lockedType, lockedValue, variedType, variedValue } = props
  const covarianceOriginPrimer = {
    lockedType,
    lockedValue,
    variedType,
    variedValue,
  } as CovariancePrimer

  const covarianceSeries = getCovarianceSeries({ ...covarianceOriginPrimer })

  const componentArray = covarianceSeries.map((covariantSet, index) => {
    const covarianceButtonProps = { ...props, ...covariantSet }
    return <CovarianceButton key={index} {...covarianceButtonProps} />
  })

  return componentArray
}

export const CovarianceButtonList = (
  props: CovarianceButtonListProps
): ReactElement => {
  return <>{getCovarianceButtons(props)}</>
}
