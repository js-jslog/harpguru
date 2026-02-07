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
  reduceToStaticSizes,
} from '../../../utils'
import { useHarpGuruStore } from '../../../store'

export const useSetFromSourceHarpStrata = (): void => {
  const nextSourceHarpStrata = useHarpGuruStore(
    (state) => state.activeHarpStrata
  )
  const prevHarpKeyId = useHarpGuruStore((state) => state.harpKeyId)
  const setHarpKeyId = useHarpGuruStore((state) => state.setHarpKeyId)
  const prevPozitionId = useHarpGuruStore((state) => state.pozitionId)
  const setPozitionId = useHarpGuruStore((state) => state.setPozitionId)
  const prevRootPitchId = useHarpGuruStore((state) => state.rootPitchId)
  const setRootPitchId = useHarpGuruStore((state) => state.setRootPitchId)
  const prevTuningId = useHarpGuruStore((state) => state.tuningId)
  const setTuningId = useHarpGuruStore((state) => state.setTuningId)
  const prevValvingId = useHarpGuruStore((state) => state.valvingId)
  const setValvingId = useHarpGuruStore((state) => state.setValvingId)
  const prevActiveDegreeIds = useHarpGuruStore(
    (state) => state.activeDegreeIds
  )
  const setActiveDegreeIds = useHarpGuruStore(
    (state) => state.setActiveDegreeIds
  )
  const prevActivePitchIds = useHarpGuruStore(
    (state) => state.activePitchIds
  )
  const setActivePitchIds = useHarpGuruStore(
    (state) => state.setActivePitchIds
  )
  const prevFullInteractionMatrix = useHarpGuruStore(
    (state) => state.activeInteractionMatrix
  )
  const setFullInteractionMatrix = useHarpGuruStore(
    (state) => state.setActiveInteractionMatrix
  )
  const prevFullDegreeMatrix = useHarpGuruStore(
    (state) => state.activeDegreeMatrix
  )
  const setFullDegreeMatrix = useHarpGuruStore(
    (state) => state.setActiveDegreeMatrix
  )
  const prevFullPitchMatrix = useHarpGuruStore(
    (state) => state.activePitchMatrix
  )
  const setFullPitchMatrix = useHarpGuruStore(
    (state) => state.setActivePitchMatrix
  )
  const prevSourceColumnBounds = useHarpGuruStore(
    (state) => state.sourceColumnBounds
  )
  const setSourceColumnBounds = useHarpGuruStore(
    (state) => state.setSourceColumnBounds
  )
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
  const prevCellToggleBuffer = useHarpGuruStore(
    (state) => state.bufferedActivityToggles
  )
  const setCellToggleBuffer = useHarpGuruStore(
    (state) => state.setBufferedActivityToggles
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
  const nextDynamicSizes = reduceLayoutFactsToDynamicSizes(prevDynamicSizes, {
    fullLayoutFacts: nextFullLayoutFacts,
    layoutFacts: nextLayoutFacts,
  })
  const nextStaticSizes = reduceToStaticSizes(prevStaticSizes)
  const nextCellToggleBuffer =
    reduceToEmptyBufferedActivityToggles(prevCellToggleBuffer)
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
