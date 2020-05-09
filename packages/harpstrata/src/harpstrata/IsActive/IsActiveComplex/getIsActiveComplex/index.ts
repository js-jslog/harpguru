import type { IsActiveComplex } from '../types'
import type { IsActiveProps } from '../../types'
import { getIsActiveMatrix } from '../../IsActiveMatrix'
import { getActiveIdsPair } from '../../ActiveIds'

export const getIsActiveComplex = (isActiveProps: IsActiveProps): IsActiveComplex => {
  return {
    isActiveMatrix: getIsActiveMatrix(isActiveProps),
    ...getActiveIdsPair(isActiveProps),
  }
}
