import { getCovariantSet } from 'harpstrata'

import type { CovarianceSeries, CovariancePrimer } from '../types'
import { getSeriesControllers } from '../getSeriesControllers'

export const getCovarianceSeries = (
  props: CovariancePrimer
): CovarianceSeries => {
  const seriesControllers = getSeriesControllers(props)

  return seriesControllers.map((covariantControllers) => {
    return getCovariantSet(covariantControllers)
  })
}
