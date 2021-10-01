import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDerivePitchMatrix = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevPitchMatrix, setPitchMatrix] = useGlobal('activePitchMatrix')

  useEffect(() => {
    if (
      doSparceIdedObjectMatricesMatch(
        prevPitchMatrix,
        activeHarpStrata.pitchMatrix
      )
    )
      return
    console.log(':::::::::::::::::::::::::::::::::: pitchmatrix changed')
    setPitchMatrix(activeHarpStrata.pitchMatrix)
    // TODO: Should consider whether the prevPichMatrix should
    // be included here. What will happen if it is somehow
    // updated independently of the activeHarpSrata
  }, [activeHarpStrata])
}
