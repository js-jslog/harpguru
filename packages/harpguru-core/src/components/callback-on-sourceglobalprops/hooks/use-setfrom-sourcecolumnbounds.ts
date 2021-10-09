import { useGlobal, useDispatch } from 'reactn'
import { useEffect } from 'react'

import { reduceColumnBounds } from '../utils'
import {
  reduceFullMatrixToViewableMatrix,
  reduceViewableMatrixToLayoutFacts,
} from '../../../utils'

export const useSetFromSourceColumnBounds = (): void => {
  reduceFullMatrixToViewableMatrix
  reduceViewableMatrixToLayoutFacts
  const [nextSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [fullDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [fullPitchMatrix] = useGlobal('activePitchMatrix')
  const [viewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')
  const nextViewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    viewableInteractionMatrix,
    fullInteractionMatrix,
    nextSourceColumnBounds
  )

  const dispatchForViewableInteractionMatrix = useDispatch(
    (prevViewableInteractionMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableInteractionMatrix,
        fullInteractionMatrix,
        nextSourceColumnBounds
      ),
    'viewableInteractionMatrix'
  )
  const dispatchForViewableDegreeMatrix = useDispatch(
    (prevViewableDegreeMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableDegreeMatrix,
        fullDegreeMatrix,
        nextSourceColumnBounds
      ),
    'viewableDegreeMatrix'
  )
  const dispatchForViewablePitchMatrix = useDispatch(
    (prevViewablePitchMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewablePitchMatrix,
        fullPitchMatrix,
        nextSourceColumnBounds
      ),
    'viewablePitchMatrix'
  )
  const dispatchForColumnBounds = useDispatch(
    (prevColumnBounds) =>
      reduceColumnBounds(prevColumnBounds, nextSourceColumnBounds),
    'columnBounds'
  )
  const dispatchForLayoutFacts = useDispatch(
    (prevLayoutFacts) =>
      reduceViewableMatrixToLayoutFacts(
        prevLayoutFacts,
        nextViewableInteractionMatrix
      ),
    'layoutFacts'
  )

  useEffect(() => {
    dispatchForViewableInteractionMatrix()
    dispatchForViewableDegreeMatrix()
    dispatchForViewablePitchMatrix()
    dispatchForColumnBounds()
    dispatchForLayoutFacts()
  }, [nextSourceColumnBounds])
}
