import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveViewableDegreeMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewableDegreeMatrix = (): void => {
  const [activeDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [columnBounds] = useGlobal('columnBounds')
  const [prevDegreeMatrix, setDegreeMatrix] = useGlobal('viewableDegreeMatrix')

  useEffect(() => {
    const nextViewableDegreeMatrix = deriveViewableDegreeMatrix(
      activeDegreeMatrix,
      columnBounds
    )
    if (
      doSparceIdedObjectMatricesMatch(
        prevDegreeMatrix,
        nextViewableDegreeMatrix
      )
    )
      return
    console.log(
      ':::::::::::::::::::::::::::::::::: viewable degreeMatrix changed'
    )
    setDegreeMatrix(nextViewableDegreeMatrix)
  }, [activeDegreeMatrix, columnBounds])
}
