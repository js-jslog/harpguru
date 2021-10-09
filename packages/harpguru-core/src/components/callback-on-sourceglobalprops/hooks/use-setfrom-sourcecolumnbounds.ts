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

  const viewableInteractionMatrixDispatch = useDispatch(
    (prevViewableInteractionMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableInteractionMatrix,
        fullInteractionMatrix,
        nextSourceColumnBounds
      ),
    'viewableInteractionMatrix'
  )
  const viewableDegreeMatrixDispatch = useDispatch(
    (prevViewableDegreeMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableDegreeMatrix,
        fullDegreeMatrix,
        nextSourceColumnBounds
      ),
    'viewableDegreeMatrix'
  )
  const viewablePitchMatrixDispatch = useDispatch(
    (prevViewablePitchMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewablePitchMatrix,
        fullPitchMatrix,
        nextSourceColumnBounds
      ),
    'viewablePitchMatrix'
  )
  const columnBoundsDispatch = useDispatch(
    (prevColumnBounds) =>
      reduceColumnBounds(prevColumnBounds, nextSourceColumnBounds),
    'columnBounds'
  )
  const layoutFactsDispatch = useDispatch(
    (prevLayoutFacts) =>
      reduceViewableMatrixToLayoutFacts(
        prevLayoutFacts,
        nextViewableInteractionMatrix
      ),
    'layoutFacts'
  )

  useEffect(() => {
    viewableInteractionMatrixDispatch()
    viewableDegreeMatrixDispatch()
    viewablePitchMatrixDispatch()
    columnBoundsDispatch()
    layoutFactsDispatch()
  }, [nextSourceColumnBounds])
}
