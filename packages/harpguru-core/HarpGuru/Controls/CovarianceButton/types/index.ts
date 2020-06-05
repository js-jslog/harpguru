import type { CovariantSet } from 'harpstrata'

import type { HarpStrataControlProps } from '../../types'
import type { CovariancePrimer } from '../../CovarianceSeries'

export type CovarianceButtonProps =
  HarpStrataControlProps
& Pick<CovariancePrimer, 'lockedType' | 'variedType'>
& CovariantSet
