import { useGlobal } from 'reactn'
import React, { useEffect } from 'react'

import { setFromSourceHarpStrataTuningId } from './utils'
import {
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
  useDeriveViewableMatrix,
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
    setFromSourceHarpStrataTuningId(newHarpStrata, prevTuningId, setTuningId)
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
    const nextSourceColumnBounds = useDeriveColumnBounds(
      newHarpStrata,
      prevSourceColumnBounds,
      setSourceColumnBounds
    )
    useDeriveColumnBounds(
      newHarpStrata,
      prevSourceColumnBounds,
      setColumnBounds
    )
    const nextViewableInteractionMatrix = useDeriveViewableMatrix(
      nextInteractionMatrix,
      nextSourceColumnBounds,
      prevViewableInteractionMatrix,
      setViewableInteractionMatrix
    )
    useDeriveViewableMatrix(
      nextDegreeMatrix,
      nextSourceColumnBounds,
      prevViewableDegreeMatrix,
      setViewableDegreeMatrix
    )
    useDeriveViewableMatrix(
      nextPitchMatrix,
      nextSourceColumnBounds,
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
