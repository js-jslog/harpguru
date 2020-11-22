import type { IsActiveProps } from '../../types'
import { ActiveIdsPair } from '../../ActiveIds/types'
import { getActiveIdsPair } from '../../ActiveIds'

export const getIsActiveComplex = (
  isActiveProps: IsActiveProps
): ActiveIdsPair => {
  return {
    ...getActiveIdsPair(isActiveProps),
  }
}
