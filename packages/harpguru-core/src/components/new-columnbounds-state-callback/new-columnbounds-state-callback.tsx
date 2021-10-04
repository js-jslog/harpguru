import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import {
  useDeriveViewableInteractionMatrix,
  useDeriveViewableDegreeMatrix,
  useDeriveViewablePitchMatrix,
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
    const nextViewableInteractionMatrix = useDeriveViewableInteractionMatrix(
      fullInteractionMatrix,
      nextColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    useDeriveViewableDegreeMatrix(
      fullDegreeMatrix,
      nextColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    useDeriveViewablePitchMatrix(
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
