import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import {
  useDeriveViewableDegreeMatrix,
  useDeriveViewablePitchMatrix,
  useDeriveLayoutFacts,
} from '../new-harpstrata-state-callback/hooks'

export const NewColumnBoundsStateCallback = (): React.ReactElement => {
  const [nextColumnBounds] = useGlobal('columnBounds')
  const [fullDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [fullPitchMatrix] = useGlobal('activePitchMatrix')
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')
  const [prevViewableDegreeMatrix, setViewableDegreeMatrix] = useGlobal(
    'viewableDegreeMatrix'
  )
  const [prevViewablePitchMatrix, setViewablePitchMatrix] = useGlobal(
    'viewablePitchMatrix'
  )
  useEffect(() => {
    const nextViewableDegreeMatrix = useDeriveViewableDegreeMatrix(
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
      nextViewableDegreeMatrix,
      prevLayoutFacts,
      setLayoutFacts
    )
  }, [nextColumnBounds])

  return <></>
}
