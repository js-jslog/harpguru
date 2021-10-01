import { useGlobal } from 'reactn'
import type { Degree, Pitch, Interaction, HarpFaceMatrix } from 'harpparts'

import { sliceMatrix } from '../../packages/slice-matrix'

import { isPopulatedArray } from './is-populated-array'

type ViewableMatrices = {
  viewableDegreeMatrix: HarpFaceMatrix<Degree>
  viewablePitchMatrix: HarpFaceMatrix<Pitch>
  viewableInteractionMatrix: HarpFaceMatrix<Interaction>
}

export const useViewableMatrices = (): ViewableMatrices => {
  // TOOMANYRENDERS this has impact all the way in to sizes
  const [degreeMatrix] = useGlobal('activeDegreeMatrix')
  const [pitchMatrix] = useGlobal('activePitchMatrix')
  const [interactionMatrix] = useGlobal('activeInteractionMatrix')
  const [columnBounds] = useGlobal('columnBounds')

  if (columnBounds === 'FIT')
    return {
      viewableDegreeMatrix: degreeMatrix,
      viewablePitchMatrix: pitchMatrix,
      viewableInteractionMatrix: interactionMatrix,
    }

  const [start, end] = columnBounds

  const viewableDegreeMatrix = sliceMatrix(degreeMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  const viewablePitchMatrix = sliceMatrix(pitchMatrix, start, end + 1).filter(
    isPopulatedArray
  )

  const viewableInteractionMatrix = sliceMatrix(
    interactionMatrix,
    start,
    end + 1
  ).filter(isPopulatedArray)

  return {
    viewableDegreeMatrix,
    viewablePitchMatrix,
    viewableInteractionMatrix,
  }
}
