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

  const tuningIdDispatch = useDispatch(
    (prevTuningId) =>
      reduceHarpStrataToTuningId(prevTuningId, nextSourceHarpStrata),
    'tuningId'
  )
  const valvingIdDispatch = useDispatch(
    (prevValvingId) =>
      reduceHarpStrataToValvingId(prevValvingId, nextSourceHarpStrata),
    'valvingId'
  )
  const harpKeyIdDispatch = useDispatch(
    (prevHarpKeyId) =>
      reduceHarpStrataToHarpKeyId(prevHarpKeyId, nextSourceHarpStrata),
    'harpKeyId'
  )
  const pozitionIdDispatch = useDispatch(
    (prevPozitionId) =>
      reduceHarpStrataToPozitionId(prevPozitionId, nextSourceHarpStrata),
    'pozitionId'
  )
  const rootPitchIdDispatch = useDispatch(
    (prevRootPitchId) =>
      reduceHarpStrataToRootPitchId(prevRootPitchId, nextSourceHarpStrata),
    'rootPitchId'
  )
  const fullInteractionMatrixDispatch = useDispatch(
    (prevFullInteractionMatrix) =>
      reduceIdedMatrix(prevFullInteractionMatrix, nextFullInteractionMatrix),
    'activeInteractionMatrix'
  )
  const fullDegreeMatrixDispatch = useDispatch(
    (prevFullDegreeMatrix) =>
      reduceIdedMatrix(prevFullDegreeMatrix, nextFullDegreeMatrix),
    'activeDegreeMatrix'
  )
  const fullPitchMatrixDispatch = useDispatch(
    (prevFullPitchMatrix) =>
      reduceIdedMatrix(prevFullPitchMatrix, nextFullPitchMatrix),
    'activePitchMatrix'
  )
  const activeDegreeIdsDispatch = useDispatch(
    (prevActiveDegreeIds) =>
      reduceHarpStrataToActiveDegreeIds(
        prevActiveDegreeIds,
        nextSourceHarpStrata
      ),
    'activeDegreeIds'
  )
  const activePitchIdsDispatch = useDispatch(
    (prevActivePitchIds) =>
      reduceHarpStrataToActivePitchIds(
        prevActivePitchIds,
        nextSourceHarpStrata
      ),
    'activePitchIds'
  )
  const viewableInteractionMatrixDispatch = useDispatch(
    (prevViewableInteractionMatrix) =>
      reduceIdedMatrix(
        prevViewableInteractionMatrix,
        nextFullInteractionMatrix
      ),
    'viewableInteractionMatrix'
  )
  const viewableDegreeMatrixDispatch = useDispatch(
    (prevViewableDegreeMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewableDegreeMatrix,
        nextFullDegreeMatrix,
        nextColumnBounds
      ),
    'viewableDegreeMatrix'
  )
  const viewablePitchMatrixDispatch = useDispatch(
    (prevViewablePitchMatrix) =>
      reduceFullMatrixToViewableMatrix(
        prevViewablePitchMatrix,
        nextFullPitchMatrix,
        nextColumnBounds
      ),
    'viewablePitchMatrix'
  )
  const sourceColumnBoundsDispatch = useDispatch(
    (prevSoureceColumnBounds) =>
      reduceColumnBounds(prevSoureceColumnBounds, nextColumnBounds),
    'sourceColumnBounds'
  )
  const columnBoundsDispatch = useDispatch(
    (prevColumnBounds) =>
      reduceColumnBounds(prevColumnBounds, nextColumnBounds),
    'columnBounds'
  )
  const layoutFactsDispatch = useDispatch(
    (prevLayoutFacts) =>
      reduceViewableMatrixToLayoutFacts(
        prevLayoutFacts,
        nextViewableInteractionMatrix
      ),
    'layoutFacts'
  )
  const emptyBufferedActivityTogglesDispatch = useDispatch(
    (prevBufferedActivityToggles) =>
      reduceToEmptyBufferedActivityToggles(prevBufferedActivityToggles),
    'bufferedActivityToggles'
  )
  useEffect(() => {
    tuningIdDispatch()
    valvingIdDispatch()
    harpKeyIdDispatch()
    pozitionIdDispatch()
    rootPitchIdDispatch()
    fullInteractionMatrixDispatch()
    fullDegreeMatrixDispatch()
    fullPitchMatrixDispatch()
    activeDegreeIdsDispatch()
    activePitchIdsDispatch()
    sourceColumnBoundsDispatch()
    columnBoundsDispatch()
    viewableInteractionMatrixDispatch()
    viewableDegreeMatrixDispatch()
    viewablePitchMatrixDispatch()
    layoutFactsDispatch()
    emptyBufferedActivityTogglesDispatch()
  }, [nextSourceHarpStrata])
}
