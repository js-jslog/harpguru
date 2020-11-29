import { DegreeIds } from '../../degree'

export enum ScaleIds {
  MajorTriad,
  MinorTriad,
  MajorPentatonic,
  MinorPentatonic,
  Major,
}

export type Scale = {
  readonly id: ScaleIds
  readonly label: string
  readonly degrees: ReadonlyArray<DegreeIds>
}
