import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { reduceColumnBounds, setIfNew } from '../utils'
import {
  reduceFullMatrixToViewableMatrix,
  reduceViewableMatrixToLayoutFacts,
  reduceLayoutFactsToDynamicSizes,
  reduceLayoutFactsToStaticSizes,
} from '../../../utils'

export const useSetFromSourceColumnBounds = (): void => {
  const [nextSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [fullDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [fullPitchMatrix] = useGlobal('activePitchMatrix')
  const [prevColumnBounds, setColumnBounds] = useGlobal('columnBounds')
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
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')
  const [prevDynamicSizes, setDynamicSizes] = useGlobal('dynamicSizes')
  const [prevStaticSizes, setStaticSizes] = useGlobal('staticSizes')

  const nextColumnBounds = reduceColumnBounds(
    prevColumnBounds,
    nextSourceColumnBounds
  )
  const nextViewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    prevViewableInteractionMatrix,
    fullInteractionMatrix,
    fullInteractionMatrix,
    nextSourceColumnBounds
  )
  const nextViewableDegreeMatrix = reduceFullMatrixToViewableMatrix(
    prevViewableDegreeMatrix,
    fullDegreeMatrix,
    fullInteractionMatrix,
    nextSourceColumnBounds
  )
  const nextViewablePitchMatrix = reduceFullMatrixToViewableMatrix(
    prevViewablePitchMatrix,
    fullPitchMatrix,
    fullInteractionMatrix,
    nextSourceColumnBounds
  )
  const nextLayoutFacts = reduceViewableMatrixToLayoutFacts(
    prevLayoutFacts,
    nextViewableInteractionMatrix
  )
  const nextDynamicSizes = reduceLayoutFactsToDynamicSizes(
    prevDynamicSizes,
    nextLayoutFacts,
    nextColumnBounds
  )
  const nextStaticSizes = reduceLayoutFactsToStaticSizes(
    prevStaticSizes,
    nextLayoutFacts
  )

  useEffect(() => {
    setIfNew(prevColumnBounds, nextColumnBounds, setColumnBounds)
    setIfNew(
      prevViewableInteractionMatrix,
      nextViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    setIfNew(
      prevViewableDegreeMatrix,
      nextViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    setIfNew(
      prevViewablePitchMatrix,
      nextViewablePitchMatrix,
      setViewablePitchMatrix
    )
    setIfNew(prevLayoutFacts, nextLayoutFacts, setLayoutFacts)
    setIfNew(prevDynamicSizes, nextDynamicSizes, setDynamicSizes)
    setIfNew(prevStaticSizes, nextStaticSizes, setStaticSizes)
  }, [nextSourceColumnBounds])
}
