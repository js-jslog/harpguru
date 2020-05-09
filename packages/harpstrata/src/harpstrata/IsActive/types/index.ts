import type { ActiveIds } from '../ActiveIds'
import type { PitchMatrix } from '../../Pitch'
import type { DegreeMatrix } from '../../Degree'


export type IsActiveProps = {
  degreeMatrix: DegreeMatrix;
  pitchMatrix: PitchMatrix;
  activeIds: ActiveIds;
}
