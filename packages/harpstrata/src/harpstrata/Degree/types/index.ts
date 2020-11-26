import { DegreeIds } from 'harpparts'

export type Degree = {
  readonly id: DegreeIds
}

export type DegreeRow = ReadonlyArray<Degree | undefined>
export type DegreeMatrix = ReadonlyArray<DegreeRow>
