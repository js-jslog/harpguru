import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import {
  setFromHarpStrataToTuningId,
  setFromHarpStrataToValvingId,
  setFromHarpStrataToActiveDegreeIds,
  setFromHarpStrataToActivePitchIds,
  setFromHarpStrataToInteractionMatrix,
  setFromHarpStrataToHarpKeyId,
  setFromHarpStrataToPozitionId,
  setFromHarpStrataToRootPitchId,
  setFromHarpStrataToDegreeMatrix,
  setFromHarpStrataToPitchMatrix,
  setFromFullMatrixToColumnBounds,
  setToEmptyBufferedActivityToggles,
  setFromFullMatrixToViewableMatrix,
  setFromViewableMatrixToLayoutFacts,
} from '../utils'

export const useSetFromSourceHarpStrata = (): void => {
  const [nextSourceHarpStrata] = useGlobal('activeHarpStrata')
  const [prevTuningId, setTuningId] = useGlobal('tuningId')
  const [prevValvingId, setValvingId] = useGlobal('valvingId')
  const [prevInteractionMatrix, setInteractionMatrix] = useGlobal(
    'activeInteractionMatrix'
  )
  const [prevActiveDegreeIds, setActiveDegreeIds] = useGlobal('activeDegreeIds')
  const [prevActivePitchIds, setActivePitchIds] = useGlobal('activePitchIds')
  const [prevHarpKeyId, setHarpKeyId] = useGlobal('harpKeyId')
  const [prevPozitionId, setPozitionId] = useGlobal('pozitionId')
  const [prevRootPitchId, setRootPitchId] = useGlobal('rootPitchId')
  const [prevSourceColumnBounds, setSourceColumnBounds] = useGlobal(
    'sourceColumnBounds'
  )
  const [, setColumnBounds] = useGlobal('columnBounds')
  const [prevDegreeMatrix, setDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [prevPitchMatrix, setPitchMatrix] = useGlobal('activePitchMatrix')
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
  const [prevBufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )
  useEffect(() => {
    setFromHarpStrataToTuningId(nextSourceHarpStrata, prevTuningId, setTuningId)
    setFromHarpStrataToValvingId(
      nextSourceHarpStrata,
      prevValvingId,
      setValvingId
    )
    const nextFullInteractionMatrix = setFromHarpStrataToInteractionMatrix(
      nextSourceHarpStrata,
      prevInteractionMatrix,
      setInteractionMatrix
    )
    const nextFullDegreeMatrix = setFromHarpStrataToDegreeMatrix(
      nextSourceHarpStrata,
      prevDegreeMatrix,
      setDegreeMatrix
    )
    const nextFullPitchMatrix = setFromHarpStrataToPitchMatrix(
      nextSourceHarpStrata,
      prevPitchMatrix,
      setPitchMatrix
    )
    setFromHarpStrataToHarpKeyId(
      nextSourceHarpStrata,
      prevHarpKeyId,
      setHarpKeyId
    )
    setFromHarpStrataToPozitionId(
      nextSourceHarpStrata,
      prevPozitionId,
      setPozitionId
    )
    setFromHarpStrataToRootPitchId(
      nextSourceHarpStrata,
      prevRootPitchId,
      setRootPitchId
    )
    setFromHarpStrataToActiveDegreeIds(
      nextSourceHarpStrata,
      prevActiveDegreeIds,
      setActiveDegreeIds
    )
    setFromHarpStrataToActivePitchIds(
      nextSourceHarpStrata,
      prevActivePitchIds,
      setActivePitchIds
    )
    const nextSourceColumnBounds = setFromFullMatrixToColumnBounds(
      nextFullInteractionMatrix,
      prevSourceColumnBounds,
      setSourceColumnBounds
    )
    setFromFullMatrixToColumnBounds(
      nextFullInteractionMatrix,
      prevSourceColumnBounds,
      setColumnBounds
    )
    const nextViewableInteractionMatrix = setFromFullMatrixToViewableMatrix(
      nextFullInteractionMatrix,
      nextSourceColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    setFromFullMatrixToViewableMatrix(
      nextFullDegreeMatrix,
      nextSourceColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    setFromFullMatrixToViewableMatrix(
      nextFullPitchMatrix,
      nextSourceColumnBounds,
      prevViewablePitchMatrix,
      setViewablePitchMatrix
    )
    setFromViewableMatrixToLayoutFacts(
      nextViewableInteractionMatrix,
      prevLayoutFacts,
      setLayoutFacts
    )
    setToEmptyBufferedActivityToggles(
      prevBufferedActivityToggles,
      setBufferedActivityToggles
    )
  }, [nextSourceHarpStrata])
}
