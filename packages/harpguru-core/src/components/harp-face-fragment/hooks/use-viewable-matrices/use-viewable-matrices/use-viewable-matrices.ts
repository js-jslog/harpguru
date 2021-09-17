import { useGlobal } from 'reactn'
import type { Degree, Pitch, Interaction, HarpFaceMatrix } from 'harpparts'

import { isPopulatedArray } from '../is-populated-array'
import { sliceMatrix } from '../../../../../packages/slice-matrix'

type ViewableMatrices = {
  viewableDegreeMatrix: HarpFaceMatrix<Degree>
  viewablePitchMatrix: HarpFaceMatrix<Pitch>
  viewableInteractionMatrix: HarpFaceMatrix<Interaction>
}

export const useViewableMatrices = (): ViewableMatrices => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [columnBounds] = useGlobal('columnBounds')

  if (columnBounds === 'FIT')
    return {
      viewableDegreeMatrix: activeHarpStrata.degreeMatrix,
      viewablePitchMatrix: activeHarpStrata.pitchMatrix,
      viewableInteractionMatrix: activeHarpStrata.apparatus.interactionMatrix,
    }

  const [start, end] = columnBounds

  const viewableDegreeMatrix = sliceMatrix(
    activeHarpStrata.degreeMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  const viewablePitchMatrix = sliceMatrix(
    activeHarpStrata.pitchMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  const viewableInteractionMatrix = sliceMatrix(
    activeHarpStrata.apparatus.interactionMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return {
    viewableDegreeMatrix,
    viewablePitchMatrix,
    viewableInteractionMatrix,
  }
}
