import type { IsActiveMatrix } from '../types'
import type { IsActiveProps } from '../../types'
import { DegreeIds } from '../../../Degree'

import { getMatrixGivenDegree, getMatrixGivenPitch } from './getIsActiveMatrixForSpecificType'

export const getIsActiveMatrix = (props: IsActiveProps): IsActiveMatrix => {
  const { activeIds } = props
  if (activeIds[0] in Object.values(DegreeIds)) {
    return getMatrixGivenDegree(props)
  }
  return getMatrixGivenPitch(props)
}
