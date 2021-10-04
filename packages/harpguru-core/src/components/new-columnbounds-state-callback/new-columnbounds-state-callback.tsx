import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import {
  useDeriveViewableMatrix,
  useDeriveLayoutFacts,
} from '../new-harpstrata-state-callback/hooks'

export const NewColumnBoundsStateCallback = (): React.ReactElement => {
  const [nextColumnBounds] = useGlobal('columnBounds')
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
    const nextViewableInteractionMatrix = useDeriveViewableMatrix(
      fullInteractionMatrix,
      nextColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    useDeriveViewableMatrix(
      fullDegreeMatrix,
      nextColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    useDeriveViewableMatrix(
      fullPitchMatrix,
      nextColumnBounds,
      prevViewablePitchMatrix,
      setViewablePitchMatrix
    )
    useDeriveLayoutFacts(
      nextViewableInteractionMatrix,
      prevLayoutFacts,
      setLayoutFacts
    )
  }, [nextColumnBounds])

  return <></>
}
