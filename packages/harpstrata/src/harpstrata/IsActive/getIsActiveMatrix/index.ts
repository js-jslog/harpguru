import type { IsActiveProps } from '../types'
import { DegreeIds } from '../../Degree'

import { getMatrixGivenDegree, getMatrixGivenPitch } from './getIsActiveMatrixForSpecificType'

import type { IsActiveMatrix } from './types'

export const getIsActiveMatrix = (props: IsActiveProps): IsActiveMatrix => {
  const { activeIds } = props
  if (activeIds[0] in Object.values(DegreeIds)) {
    return getMatrixGivenDegree(props)
  }
  return getMatrixGivenPitch(props)
}

export type { IsActiveMatrix, IsActiveRow } from './types'
export { IsActiveIds } from './types'
