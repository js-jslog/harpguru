import { getCovariantSet } from 'harpcovariance'

import { getSeriesControllers } from '../get-series-controllers'
import type {
  CovarianceSeries,
  CovariancePrimer,
} from '../../covariance-series-types'

export const getCovarianceSeries = (
  props: CovariancePrimer
): CovarianceSeries => {
  const seriesControllers = getSeriesControllers(props)

  return seriesControllers.map((covariantControllers) => {
    return getCovariantSet(covariantControllers)
  })
}
