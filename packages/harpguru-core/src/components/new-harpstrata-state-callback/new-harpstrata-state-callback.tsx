import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import {
  useDeriveTuningId,
  useDeriveValvingId,
  useDeriveInteractionMatrix,
  useDeriveDegreeMatrix,
  useDerivePitchMatrix,
  useDeriveHarpKeyId,
  useDerivePozitionId,
  useDeriveRootPitchId,
  useDeriveActiveDegreeIds,
  useDeriveActivePitchIds,
  useDeriveColumnBounds,
  useDeriveViewableInteractionMatrix,
  useDeriveViewableDegreeMatrix,
  useDeriveViewablePitchMatrix,
  useDeriveLayoutFacts,
  useEmptyBufferedActivityToggles,
} from './hooks'

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
  const [prevColumnBounds, setColumnBounds] = useGlobal('columnBounds')
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
    useDeriveTuningId(newHarpStrata, prevTuningId, setTuningId)
    useDeriveValvingId(newHarpStrata, prevValvingId, setValvingId)
    const nextInteractionMatrix = useDeriveInteractionMatrix(
      newHarpStrata,
      prevInteractionMatrix,
      setInteractionMatrix
    )
    const nextDegreeMatrix = useDeriveDegreeMatrix(
      newHarpStrata,
      prevDegreeMatrix,
      setDegreeMatrix
    )
    const nextPitchMatrix = useDerivePitchMatrix(
      newHarpStrata,
      prevPitchMatrix,
      setPitchMatrix
    )
    useDeriveHarpKeyId(newHarpStrata, prevHarpKeyId, setHarpKeyId)
    useDerivePozitionId(newHarpStrata, prevPozitionId, setPozitionId)
    useDeriveRootPitchId(newHarpStrata, prevRootPitchId, setRootPitchId)
    useDeriveActiveDegreeIds(
      newHarpStrata,
      prevActiveDegreeIds,
      setActiveDegreeIds
    )
    useDeriveActivePitchIds(
      newHarpStrata,
      prevActivePitchIds,
      setActivePitchIds
    )
    const nextColumnBounds = useDeriveColumnBounds(
      newHarpStrata,
      prevColumnBounds,
      setColumnBounds
    )
    const nextViewableInteractionMatrix = useDeriveViewableInteractionMatrix(
      nextInteractionMatrix,
      nextColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    useDeriveViewableDegreeMatrix(
      nextDegreeMatrix,
      nextColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    useDeriveViewablePitchMatrix(
      nextPitchMatrix,
      nextColumnBounds,
      prevViewablePitchMatrix,
      setViewablePitchMatrix
    )
    useDeriveLayoutFacts(
      nextViewableInteractionMatrix,
      prevLayoutFacts,
      setLayoutFacts
    )
    useEmptyBufferedActivityToggles(
      prevBufferedActivityToggles,
      setBufferedActivityToggles
    )
  }, [newHarpStrata])

  return <></>
}
