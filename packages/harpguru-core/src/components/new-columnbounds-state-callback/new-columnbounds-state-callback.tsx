import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import { setFromViewableMatrixToLayoutFacts } from '../new-harpstrata-state-callback/utils/setfrom-viewablematrix-to-layoutfacts'
import { setFromHarpStrataToViewableMatrix } from '../new-harpstrata-state-callback/utils'

import { setFromSourceColumnBounds } from './utils'

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
    const nextViewableInteractionMatrix = setFromHarpStrataToViewableMatrix(
      fullInteractionMatrix,
      nextSourceColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    setFromHarpStrataToViewableMatrix(
      fullDegreeMatrix,
      nextSourceColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    setFromHarpStrataToViewableMatrix(
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
