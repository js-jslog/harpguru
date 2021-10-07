import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import {
  setFromFullMatrixToViewableMatrix,
  setFromViewableMatrixToLayoutFacts,
  setFromSourceColumnBoundsColumnBounds,
} from '../utils'
import {} from '../../../utils'

export const useSetFromSourceColumnBounds = (): void => {
  const [nextSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [prevColumnBounds, setColumnBounds] = useGlobal('columnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [fullDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [fullPitchMatrix] = useGlobal('activePitchMatrix')
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')
  const [
    prevViewableInteractionMatrix,
    setViewableInteractionMatrix,
  ] = useGlobal('viewableInteractionMatrix')
  const [prevViewableDegreeMatrix, setViewableDegreeMatrix] = useGlobal(
    'viewableDegreeMatrix'
  )
  const [prevViewablePitchMatrix, setViewablePitchMatrix] = useGlobal(
    'viewablePitchMatrix'
  )
  useEffect(() => {
    const nextViewableInteractionMatrix = setFromFullMatrixToViewableMatrix(
      fullInteractionMatrix,
      nextSourceColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    setFromFullMatrixToViewableMatrix(
      fullDegreeMatrix,
      nextSourceColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    setFromFullMatrixToViewableMatrix(
      fullPitchMatrix,
      nextSourceColumnBounds,
      prevViewablePitchMatrix,
      setViewablePitchMatrix
    )
    setFromSourceColumnBoundsColumnBounds(
      nextSourceColumnBounds,
      prevColumnBounds,
      setColumnBounds
    )
    setFromViewableMatrixToLayoutFacts(
      nextViewableInteractionMatrix,
      prevLayoutFacts,
      setLayoutFacts
    )
  }, [nextSourceColumnBounds])
}
