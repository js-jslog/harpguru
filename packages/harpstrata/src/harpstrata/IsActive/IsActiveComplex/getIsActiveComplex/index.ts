import type { IsActiveComplex } from '../types'
import type { IsActiveProps } from '../../types'
import { getActiveIdsPair } from '../../ActiveIds'

export const getIsActiveComplex = (
  isActiveProps: IsActiveProps
): IsActiveComplex => {
  return {
    ...getActiveIdsPair(isActiveProps),
  }
}
