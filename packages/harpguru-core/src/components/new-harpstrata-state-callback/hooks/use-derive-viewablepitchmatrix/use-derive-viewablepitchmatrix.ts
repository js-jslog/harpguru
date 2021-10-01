import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveViewablePitchMatrix } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../../../packages/do-sparce-ided-object-matrices-match'

export const useDeriveViewablePitchMatrix = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [columnBounds] = useGlobal('columnBounds')
  const [prevPitchMatrix, setPitchMatrix] = useGlobal('viewablePitchMatrix')

  useEffect(() => {
    const nextViewablePitchMatrix = deriveViewablePitchMatrix(
      activeHarpStrata,
      columnBounds
    )
    if (
      doSparceIdedObjectMatricesMatch(prevPitchMatrix, nextViewablePitchMatrix)
    )
      return
    console.log(
      ':::::::::::::::::::::::::::::::::: viewable pitchMatrix changed'
    )
    setPitchMatrix(nextViewablePitchMatrix)
  }, [activeHarpStrata, columnBounds, prevPitchMatrix, setPitchMatrix])
}
