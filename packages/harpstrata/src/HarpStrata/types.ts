import { DegreeMatrix } from './Degree/types'
import { Apparatus } from './Apparatus/types'

export interface HarpStrata {
  readonly apparatus: Apparatus;
  readonly degreeMatrix: DegreeMatrix;
}
