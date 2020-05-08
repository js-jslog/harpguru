import { getIsActiveMatrix } from './getIsActiveMatrix'
import { getActiveIdsPair } from './getActiveIdsPair'

import type { IsActiveProps, IsActiveComplex } from './types'

export const getIsActiveComplex = (isActiveProps: IsActiveProps): IsActiveComplex => {
  return {
    isActiveMatrix: getIsActiveMatrix(isActiveProps),
    ...getActiveIdsPair(isActiveProps),
  }
}

export type { IsActiveMatrix, IsActiveRow } from './getIsActiveMatrix'
export { IsActiveIds } from './getIsActiveMatrix'
export type { ActiveDegreeIds, ActivePitchIds, ActiveIds } from './getActiveIdsPair' 
export type { IsActiveComplex } from './types'
export { EXAMPLE_IS_ACTIVE_COMPLEXES } from './testResources'
