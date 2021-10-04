import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

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
  setFromHarpStrataToViewableMatrix,
  setFromHarpStrataToColumnBounds,
  setFromViewableMatrixToLayoutFacts,
  setToEmptyBufferedActivityToggles,
} from './utils'

export const NewHarpStrataStateCallback = (): React.ReactElement => {
  const [newHarpStrata] = useGlobal('activeHarpStrata')
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
    setFromHarpStrataToTuningId(newHarpStrata, prevTuningId, setTuningId)
    setFromHarpStrataToValvingId(newHarpStrata, prevValvingId, setValvingId)
    const nextInteractionMatrix = setFromHarpStrataToInteractionMatrix(
      newHarpStrata,
      prevInteractionMatrix,
      setInteractionMatrix
    )
    const nextDegreeMatrix = setFromHarpStrataToDegreeMatrix(
      newHarpStrata,
      prevDegreeMatrix,
      setDegreeMatrix
    )
    const nextPitchMatrix = setFromHarpStrataToPitchMatrix(
      newHarpStrata,
      prevPitchMatrix,
      setPitchMatrix
    )
    setFromHarpStrataToHarpKeyId(newHarpStrata, prevHarpKeyId, setHarpKeyId)
    setFromHarpStrataToPozitionId(newHarpStrata, prevPozitionId, setPozitionId)
    setFromHarpStrataToRootPitchId(
      newHarpStrata,
      prevRootPitchId,
      setRootPitchId
    )
    setFromHarpStrataToActiveDegreeIds(
      newHarpStrata,
      prevActiveDegreeIds,
      setActiveDegreeIds
    )
    setFromHarpStrataToActivePitchIds(
      newHarpStrata,
      prevActivePitchIds,
      setActivePitchIds
    )
    const nextSourceColumnBounds = setFromHarpStrataToColumnBounds(
      newHarpStrata,
      prevSourceColumnBounds,
      setSourceColumnBounds
    )
    setFromHarpStrataToColumnBounds(
      newHarpStrata,
      prevSourceColumnBounds,
      setColumnBounds
    )
    const nextViewableInteractionMatrix = setFromHarpStrataToViewableMatrix(
      nextInteractionMatrix,
      nextSourceColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    setFromHarpStrataToViewableMatrix(
      nextDegreeMatrix,
      nextSourceColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    setFromHarpStrataToViewableMatrix(
      nextPitchMatrix,
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
  }, [newHarpStrata])

  return <></>
}
