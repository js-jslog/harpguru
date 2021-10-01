import { useGlobal } from 'reactn'
import { unstable_batchedUpdates } from 'react-native'
import React, { useEffect } from 'react'

import { compareLayoutFacts } from '../../utils/compare-layout-facts'
import { compareActiveIds } from '../../utils/compare-active-ids'
import { compareColumnBounds } from '../../utils'
import { doSparceIdedObjectMatricesMatch } from '../../packages/do-sparce-ided-object-matrices-match'

import {
  deriveActiveDegreeIds,
  deriveActivePitchIds,
  deriveViewableDegreeMatrix,
  deriveViewablePitchMatrix,
  deriveColumnBounds,
  deriveLayoutFacts,
} from './utils'

export const NewHarpStrataStateCallback = (): React.ReactElement => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevTuningId, setTuningId] = useGlobal('tuningId')
  const [prevValvingId, setValvingId] = useGlobal('valvingId')
  const [prevActiveInteractionMatrix, setActiveInteractionMatrix] = useGlobal(
    'activeInteractionMatrix'
  )
  const [prevActiveDegreeIds, setActiveDegreeIds] = useGlobal('activeDegreeIds')
  const [prevActivePitchIds, setActivePitchIds] = useGlobal('activePitchIds')
  const [prevColumnBounds, setColumnBounds] = useGlobal('columnBounds')
  const [prevActiveDegreeMatrix, setActiveDegreeMatrix] = useGlobal(
    'activeDegreeMatrix'
  )
  const [prevActivePitchMatrix, setActivePitchMatrix] = useGlobal(
    'activePitchMatrix'
  )
  const [prevLayoutFacts, setLayoutFacts] = useGlobal('layoutFacts')
  const [prevViewableDegreeMatrix, setViewableDegreeMatrix] = useGlobal(
    'viewableDegreeMatrix'
  )
  const [prevViewablePitchMatrix, setViewablePitchMatrix] = useGlobal(
    'viewablePitchMatrix'
  )
  useEffect(() => {
    unstable_batchedUpdates(() => {
      const {
        apparatus: { tuningId: nextTuningId },
      } = activeHarpStrata
      if (prevTuningId !== nextTuningId) setTuningId(nextTuningId)

      const {
        apparatus: { valvingId: nextValvingId },
      } = activeHarpStrata
      if (prevValvingId !== nextValvingId) setValvingId(nextValvingId)

      const {
        apparatus: { interactionMatrix: nextActiveInteractionMatrix },
      } = activeHarpStrata
      if (
        !doSparceIdedObjectMatricesMatch(
          prevActiveInteractionMatrix,
          nextActiveInteractionMatrix
        )
      )
        setActiveInteractionMatrix(nextActiveInteractionMatrix)

      const { degreeMatrix: nextActiveDegreeMatrix } = activeHarpStrata
      if (
        !doSparceIdedObjectMatricesMatch(
          prevActiveDegreeMatrix,
          nextActiveDegreeMatrix
        )
      )
        setActiveDegreeMatrix(nextActiveDegreeMatrix)

      const { pitchMatrix: nextActivePitchMatrix } = activeHarpStrata
      if (
        !doSparceIdedObjectMatricesMatch(
          prevActivePitchMatrix,
          nextActivePitchMatrix
        )
      )
        setActivePitchMatrix(nextActivePitchMatrix)

      const nextActiveDegreeIds = deriveActiveDegreeIds(activeHarpStrata)
      if (!compareActiveIds(nextActiveDegreeIds, prevActiveDegreeIds))
        setActiveDegreeIds(nextActiveDegreeIds)

      const nextActivePitchIds = deriveActivePitchIds(activeHarpStrata)
      if (!compareActiveIds(nextActivePitchIds, prevActivePitchIds))
        setActivePitchIds(nextActivePitchIds)

      const nextColumnBounds = deriveColumnBounds(
        activeHarpStrata,
        prevColumnBounds
      )
      if (!compareColumnBounds(prevColumnBounds, nextColumnBounds))
        setColumnBounds(nextColumnBounds)

      const nextViewableDegreeMatrix = deriveViewableDegreeMatrix(
        nextActiveDegreeMatrix,
        nextColumnBounds
      )
      if (
        !doSparceIdedObjectMatricesMatch(
          prevViewableDegreeMatrix,
          nextViewableDegreeMatrix
        )
      )
        setViewableDegreeMatrix(nextViewableDegreeMatrix)

      const nextViewablePitchMatrix = deriveViewablePitchMatrix(
        nextActivePitchMatrix,
        nextColumnBounds
      )
      if (
        !doSparceIdedObjectMatricesMatch(
          prevViewablePitchMatrix,
          nextViewablePitchMatrix
        )
      )
        setViewablePitchMatrix(nextViewablePitchMatrix)

      const nextLayoutFacts = deriveLayoutFacts(nextViewableDegreeMatrix)
      if (!compareLayoutFacts(prevLayoutFacts, nextLayoutFacts))
        setLayoutFacts(nextLayoutFacts)
    })
  }, [activeHarpStrata])

  return <></>
}
