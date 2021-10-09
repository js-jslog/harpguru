import { useGlobal, useDispatch } from 'reactn'
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
  reduceIdedMatrix,
  reduceColumnBounds,
} from '../utils'
import {
  reduceFullMatrixToViewableMatrix,
  reduceViewableMatrixToLayoutFacts,
} from '../../../utils'

export const useSetFromSourceHarpStrata = (): void => {
  const [nextSourceHarpStrata] = useGlobal('activeHarpStrata')
  const [prevFullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const [prevFullDegreeMatrix] = useGlobal('activeDegreeMatrix')
  const [prevFullPitchMatrix] = useGlobal('activePitchMatrix')
  const [prevColumnBounds] = useGlobal('columnBounds')
  const [prevViewableInteractionMatrix] = useGlobal('viewableInteractionMatrix')

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
  const nextColumnBounds = reduceFullMatrixToColumnBounds(
    prevColumnBounds,
    nextFullInteractionMatrix
  )
  const nextViewableInteractionMatrix = reduceFullMatrixToViewableMatrix(
    prevViewableInteractionMatrix,
    nextFullInteractionMatrix,
    nextColumnBounds
  )

  const dispatchForTuningId = useDispatch(
    (prevTuningId) =>
      reduceHarpStrataToTuningId(prevTuningId, nextSourceHarpStrata),
    'tuningId'
  )
  const dispatchForValvingId = useDispatch(
    (prevValvingId) =>
      reduceHarpStrataToValvingId(prevValvingId, nextSourceHarpStrata),
    'valvingId'
  )
  const dispatchForHarpKeyId = useDispatch(
    (prevHarpKeyId) =>
      reduceHarpStrataToHarpKeyId(prevHarpKeyId, nextSourceHarpStrata),
    'harpKeyId'
  )
  const dispatchForPozitionId = useDispatch(
    (prevPozitionId) =>
      reduceHarpStrataToPozitionId(prevPozitionId, nextSourceHarpStrata),
    'pozitionId'
  )
  const dispatchForRootPitchId = useDispatch(
    (prevRootPitchId) =>
      reduceHarpStrataToRootPitchId(prevRootPitchId, nextSourceHarpStrata),
    'rootPitchId'
  )
  const dispatchForFullInteractionMatrix = useDispatch(
    (prevInteractionMatrix) =>
      reduceIdedMatrix(prevInteractionMatrix, nextFullInteractionMatrix),
    'activeInteractionMatrix'
  )
  const dispatchForFullDegreeMatrix = useDispatch(
    (prevDegreeMatrix) =>
      reduceIdedMatrix(prevDegreeMatrix, nextFullDegreeMatrix),
    'activeDegreeMatrix'
  )
  const dispatchForFullPitchMatrix = useDispatch(
    (prevPitchMatrix) => reduceIdedMatrix(prevPitchMatrix, nextFullPitchMatrix),
    'activePitchMatrix'
  )
  const dispatchForActiveDegreeIds = useDispatch(
    (prevActiveDegreeIds) =>
      reduceHarpStrataToActiveDegreeIds(
        prevActiveDegreeIds,
        nextSourceHarpStrata
      ),
    'activeDegreeIds'
  )
  const dispatchForActivePitchIds = useDispatch(
    (prevActivePitchIds) =>
      reduceHarpStrataToActivePitchIds(
        prevActivePitchIds,
        nextSourceHarpStrata
      ),
    'activePitchIds'
  )
  const dispatchForViewableInteractionMatrix = useDispatch(
    (prevViewableInteractionMatrix) =>
      reduceIdedMatrix(
        prevViewableInteractionMatrix,
        nextFullInteractionMatrix
      ),
    'viewableInteractionMatrix'
  )
  const dispatchForViewableDegreeMatrix = useDispatch(
    (prevViewableDegreeMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableDegreeMatrix,
        nextFullDegreeMatrix,
        nextColumnBounds
      ),
    'viewableDegreeMatrix'
  )
  const dispatchForViewablePitchMatrix = useDispatch(
    (prevViewablePitchMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewablePitchMatrix,
        nextFullPitchMatrix,
        nextColumnBounds
      ),
    'viewablePitchMatrix'
  )
  const dispatchForSourceColumnBounds = useDispatch(
    (prevSoureceColumnBounds) =>
      reduceColumnBounds(prevSoureceColumnBounds, nextColumnBounds),
    'sourceColumnBounds'
  )
  const dispatchForColumnBounds = useDispatch(
    (prevColumnBounds) =>
      reduceColumnBounds(prevColumnBounds, nextColumnBounds),
    'columnBounds'
  )
  const dispatchForLayoutFacts = useDispatch(
    (prevLayoutFacts) =>
      reduceViewableMatrixToLayoutFacts(
        prevLayoutFacts,
        nextViewableInteractionMatrix
      ),
    'layoutFacts'
  )
  const dispatchForEmptyToggleBuffer = useDispatch(
    (prevBufferedActivityToggles) =>
      reduceToEmptyBufferedActivityToggles(prevBufferedActivityToggles),
    'bufferedActivityToggles'
  )
  useEffect(() => {
    dispatchForTuningId()
    dispatchForValvingId()
    dispatchForHarpKeyId()
    dispatchForPozitionId()
    dispatchForRootPitchId()
    dispatchForFullInteractionMatrix()
    dispatchForFullDegreeMatrix()
    dispatchForFullPitchMatrix()
    dispatchForActiveDegreeIds()
    dispatchForActivePitchIds()
    dispatchForSourceColumnBounds()
    dispatchForColumnBounds()
    dispatchForViewableInteractionMatrix()
    dispatchForViewableDegreeMatrix()
    dispatchForViewablePitchMatrix()
    dispatchForLayoutFacts()
    dispatchForEmptyToggleBuffer()
  }, [nextSourceHarpStrata])
}
