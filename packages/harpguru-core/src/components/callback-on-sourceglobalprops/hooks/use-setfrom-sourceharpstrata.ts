import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import {
  reduceHarpStrataToTuningId,
  reduceHarpStrataToValvingId,
  reduceHarpStrataToHarpKeyId,
  reduceHarpStrataToPozitionId,
  reduceHarpStrataToRootPitchId,
  reduceHarpStrataToFullInteractionMatrix,
  reduceHarpStrataToFullDegreeMatrix,
  reduceHarpStrataToFullPitchMatrix,
  reduceHarpStrataToActiveDegreeIds,
  reduceHarpStrataToActivePitchIds,
  reduceFullMatrixToColumnBounds,
  reduceToEmptyBufferedActivityToggles,
  reduceColumnBounds,
  setIfNew,
} from '../utils'
import {
  reduceFullMatrixToViewableMatrix,
  reduceMatrixToLayoutFacts,
  reduceLayoutFactsToDynamicSizes,
  reduceLayoutFactsToStaticSizes,
} from '../../../utils'

export const useSetFromSourceHarpStrata = (): void => {
  const [nextSourceHarpStrata] = useGlobal('activeHarpStrata')
  const [prevHarpKeyId, setHarpKeyId] = useGlobal('harpKeyId')
  const [prevPozitionId, setPozitionId] = useGlobal('pozitionId')
  const [prevRootPitchId, setRootPitchId] = useGlobal('rootPitchId')
  const [prevTuningId, setTuningId] = useGlobal('tuningId')
  const [prevValvingId, setValvingId] = useGlobal('valvingId')
  const [prevActiveDegreeIds, setActiveDegreeIds] = useGlobal('activeDegreeIds')
  const [prevActivePitchIds, setActivePitchIds] = useGlobal('activePitchIds')
  const [prevFullInteractionMatrix, setFullInteractionMatrix] = useGlobal(
    'activeInteractionMatrix'
  )
  const [prevFullDegreeMatrix, setFullDegreeMatrix] = useGlobal(
    'activeDegreeMatrix'
  )
  const [prevFullPitchMatrix, setFullPitchMatrix] = useGlobal(
    'activePitchMatrix'
  )
  const [prevSourceColumnBounds, setSourceColumnBounds] = useGlobal(
    'sourceColumnBounds'
  )
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
  const [prevFullLayoutFacts, setFullLayoutFacts] = useGlobal('fullLayoutFacts')
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')
  const [prevDynamicSizes, setDynamicSizes] = useGlobal('dynamicSizes')
  const [prevStaticSizes, setStaticSizes] = useGlobal('staticSizes')
  const [prevCellToggleBuffer, setCellToggleBuffer] = useGlobal(
    'bufferedActivityToggles'
  )

  const nextHarpKeyId = reduceHarpStrataToHarpKeyId(
    prevHarpKeyId,
    nextSourceHarpStrata
  )
  const nextPozitionId = reduceHarpStrataToPozitionId(
    prevPozitionId,
    nextSourceHarpStrata
  )
  const nextRootPitchId = reduceHarpStrataToRootPitchId(
    prevRootPitchId,
    nextSourceHarpStrata
  )
  const nextTuningId = reduceHarpStrataToTuningId(
    prevTuningId,
    nextSourceHarpStrata
  )
  const nextValvingId = reduceHarpStrataToValvingId(
    prevValvingId,
    nextSourceHarpStrata
  )
  const nextActiveDegreeIds = reduceHarpStrataToActiveDegreeIds(
    prevActiveDegreeIds,
    nextSourceHarpStrata
  )
  const nextActivePitchIds = reduceHarpStrataToActivePitchIds(
    prevActivePitchIds,
    nextSourceHarpStrata
  )
  const nextFullInteractionMatrix = reduceHarpStrataToFullInteractionMatrix(
    prevFullInteractionMatrix,
    nextSourceHarpStrata
  )
  const nextFullDegreeMatrix = reduceHarpStrataToFullDegreeMatrix(
    prevFullDegreeMatrix,
    nextSourceHarpStrata
  )
  const nextFullPitchMatrix = reduceHarpStrataToFullPitchMatrix(
    prevFullPitchMatrix,
    nextSourceHarpStrata
  )
  const nextSourceColumnBounds = reduceFullMatrixToColumnBounds(
    prevSourceColumnBounds,
    nextFullInteractionMatrix
  )
  const nextColumnBounds = reduceColumnBounds(
    prevColumnBounds,
    nextSourceColumnBounds
  )
  const nextViewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    prevViewableInteractionMatrix,
    nextFullInteractionMatrix,
    nextFullInteractionMatrix,
    nextColumnBounds
  )
  const nextViewableDegreeMatrix = reduceFullMatrixToViewableMatrix(
    prevViewableDegreeMatrix,
    nextFullDegreeMatrix,
    nextFullInteractionMatrix,
    nextColumnBounds
  )
  const nextViewablePitchMatrix = reduceFullMatrixToViewableMatrix(
    prevViewablePitchMatrix,
    nextFullPitchMatrix,
    nextFullInteractionMatrix,
    nextColumnBounds
  )
  const nextFullLayoutFacts = reduceMatrixToLayoutFacts(
    prevFullLayoutFacts,
    nextFullInteractionMatrix
  )
  const nextLayoutFacts = reduceMatrixToLayoutFacts(
    prevLayoutFacts,
    nextViewableInteractionMatrix
  )
  const nextDynamicSizes = reduceLayoutFactsToDynamicSizes(
    prevDynamicSizes,
    nextLayoutFacts,
    nextFullLayoutFacts
  )
  const nextStaticSizes = reduceLayoutFactsToStaticSizes(prevStaticSizes)
  const nextCellToggleBuffer = reduceToEmptyBufferedActivityToggles(
    prevCellToggleBuffer
  )
  useEffect(() => {
    setIfNew(prevHarpKeyId, nextHarpKeyId, setHarpKeyId)
    setIfNew(prevPozitionId, nextPozitionId, setPozitionId)
    setIfNew(prevRootPitchId, nextRootPitchId, setRootPitchId)
    setIfNew(prevTuningId, nextTuningId, setTuningId)
    setIfNew(prevValvingId, nextValvingId, setValvingId)
    setIfNew(prevActiveDegreeIds, nextActiveDegreeIds, setActiveDegreeIds)
    setIfNew(prevActivePitchIds, nextActivePitchIds, setActivePitchIds)
    setIfNew(
      prevFullInteractionMatrix,
      nextFullInteractionMatrix,
      setFullInteractionMatrix
    )
    setIfNew(prevFullDegreeMatrix, nextFullDegreeMatrix, setFullDegreeMatrix)
    setIfNew(prevFullPitchMatrix, nextFullPitchMatrix, setFullPitchMatrix)
    setIfNew(
      prevSourceColumnBounds,
      nextSourceColumnBounds,
      setSourceColumnBounds
    )
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
    setIfNew(prevCellToggleBuffer, nextCellToggleBuffer, setCellToggleBuffer)
  }, [nextSourceHarpStrata])
}
