import { useEffect } from 'react'

import { reduceColumnBounds, setIfNew } from '../utils'
import {
  reduceFullMatrixToViewableMatrix,
  reduceMatrixToLayoutFacts,
  reduceLayoutFactsToDynamicSizes,
  reduceToStaticSizes,
} from '../../../utils'
import { useHarpGuruStore } from '../../../store'

export const useSetFromSourceColumnBounds = (): void => {
  const nextSourceColumnBounds = useHarpGuruStore(
    (state) => state.sourceColumnBounds
  )
  const fullInteractionMatrix = useHarpGuruStore(
    (state) => state.activeInteractionMatrix
  )
  const fullDegreeMatrix = useHarpGuruStore(
    (state) => state.activeDegreeMatrix
  )
  const fullPitchMatrix = useHarpGuruStore((state) => state.activePitchMatrix)
  const prevColumnBounds = useHarpGuruStore((state) => state.columnBounds)
  const setColumnBounds = useHarpGuruStore((state) => state.setColumnBounds)
  const prevViewableInteractionMatrix = useHarpGuruStore(
    (state) => state.viewableInteractionMatrix
  )
  const setViewableInteractionMatrix = useHarpGuruStore(
    (state) => state.setViewableInteractionMatrix
  )
  const prevViewableDegreeMatrix = useHarpGuruStore(
    (state) => state.viewableDegreeMatrix
  )
  const setViewableDegreeMatrix = useHarpGuruStore(
    (state) => state.setViewableDegreeMatrix
  )
  const prevViewablePitchMatrix = useHarpGuruStore(
    (state) => state.viewablePitchMatrix
  )
  const setViewablePitchMatrix = useHarpGuruStore(
    (state) => state.setViewablePitchMatrix
  )
  const prevFullLayoutFacts = useHarpGuruStore(
    (state) => state.fullLayoutFacts
  )
  const setFullLayoutFacts = useHarpGuruStore(
    (state) => state.setFullLayoutFacts
  )
  const prevLayoutFacts = useHarpGuruStore((state) => state.layoutFacts)
  const setLayoutFacts = useHarpGuruStore((state) => state.setLayoutFacts)
  const prevDynamicSizes = useHarpGuruStore((state) => state.dynamicSizes)
  const setDynamicSizes = useHarpGuruStore((state) => state.setDynamicSizes)
  const prevStaticSizes = useHarpGuruStore((state) => state.staticSizes)
  const setStaticSizes = useHarpGuruStore((state) => state.setStaticSizes)

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
  const nextFullLayoutFacts = reduceMatrixToLayoutFacts(
    prevLayoutFacts,
    fullInteractionMatrix
  )
  const nextLayoutFacts = reduceMatrixToLayoutFacts(
    prevLayoutFacts,
    nextViewableInteractionMatrix
  )
  const nextDynamicSizes = reduceLayoutFactsToDynamicSizes(prevDynamicSizes, {
    fullLayoutFacts: nextFullLayoutFacts,
    layoutFacts: nextLayoutFacts,
  })
  const nextStaticSizes = reduceToStaticSizes(prevStaticSizes)

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
    setIfNew(prevFullLayoutFacts, nextFullLayoutFacts, setFullLayoutFacts)
    setIfNew(prevLayoutFacts, nextLayoutFacts, setLayoutFacts)
    setIfNew(prevDynamicSizes, nextDynamicSizes, setDynamicSizes)
    setIfNew(prevStaticSizes, nextStaticSizes, setStaticSizes)
  }, [nextSourceColumnBounds])
}
