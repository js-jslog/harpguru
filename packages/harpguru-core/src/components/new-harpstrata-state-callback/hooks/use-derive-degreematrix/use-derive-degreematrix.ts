import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveDegreeMatrix = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevDegreeMatrix, setDegreeMatrix] = useGlobal('activeDegreeMatrix')

  useEffect(() => {
    if (
      doSparceIdedObjectMatricesMatch(
        prevDegreeMatrix,
        activeHarpStrata.degreeMatrix
      )
    )
      return
    console.log(':::::::::::::::::::::::::::::::::: degreematrix changed')
    setDegreeMatrix(activeHarpStrata.degreeMatrix)
  }, [activeHarpStrata, prevDegreeMatrix, setDegreeMatrix])
}
