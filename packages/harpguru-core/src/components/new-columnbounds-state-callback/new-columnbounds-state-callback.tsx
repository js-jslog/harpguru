import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import {
  setFromFullMatrixToViewableMatrix,
  setFromViewableMatrixToLayoutFacts,
} from '../../utils'

import { setFromSourceColumnBounds } from './utils'

// TODO: I think I might want both of the source global state useEffects to be
// defined in the same component so that we don't have to fragment the origin
// of all these dependencies. I'd like to keep as many of them out of the root
// utils folder as possible.
export const NewColumnBoundsStateCallback = (): React.ReactElement => {
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
    setFromSourceColumnBounds(
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

  return <></>
}
