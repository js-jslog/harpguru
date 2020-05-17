import type { PitchMatrix, PitchRow } from '../../Pitch'
import type { DegreeMatrix, DegreeRow } from '../../Degree'

export const flattenPitchMatrix = (matrix: PitchMatrix): PitchRow => {
  return matrix.reduce((accumulator, nextRow) => [ ...accumulator, ...nextRow ])
}

export const flattenDegreeMatrix = (matrix: DegreeMatrix): DegreeRow => {
  return matrix.reduce((accumulator, nextRow) => [ ...accumulator, ...nextRow ])
}
