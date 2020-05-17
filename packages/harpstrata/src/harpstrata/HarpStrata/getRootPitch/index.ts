import { flattenDegreeMatrix, flattenPitchMatrix } from '../flattenMatrix'
import type { Pitch, PitchMatrix } from '../../Pitch'
import { PitchIds } from '../../Pitch'
import type { Degree, DegreeMatrix } from '../../Degree'
import { DegreeIds } from '../../Degree'

export const getRootPitch = (degreeMatrix: DegreeMatrix, pitchMatrix: PitchMatrix): PitchIds | undefined => {
  const flatDegreeMatrix = flattenDegreeMatrix(degreeMatrix)
  const flatPitchMatrix = flattenPitchMatrix(pitchMatrix)

  const mappedFlatDegreeMatrix = flatDegreeMatrix.map((degree: Degree | undefined) => (degree && degree.id || undefined))
  const mappedFlatPitchMatrix = flatPitchMatrix.map((pitch: Pitch | undefined) => (pitch && pitch.id || undefined))

  const rootIndex = mappedFlatDegreeMatrix.indexOf(DegreeIds.Root)

  return mappedFlatPitchMatrix[rootIndex]
}
