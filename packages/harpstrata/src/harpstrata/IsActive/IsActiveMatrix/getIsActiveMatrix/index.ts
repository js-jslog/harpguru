import type { IsActiveMatrix } from '../types'
import type { IsActiveProps } from '../../types'
import { DegreeIds } from '../../../Degree'

import { getMatrixGivenDegree, getMatrixGivenPitch } from './getIsActiveMatrixForSpecificType'

export const getIsActiveMatrix = (props: IsActiveProps): IsActiveMatrix => {
  const { activeIds } = props
  const possibleDegreeId = activeIds[0] as DegreeIds
  if (Object.values(DegreeIds).includes(possibleDegreeId)) {
    return getMatrixGivenDegree(props)
  }
  return getMatrixGivenPitch(props)
}
