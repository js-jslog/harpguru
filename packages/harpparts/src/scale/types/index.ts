import { DegreeIds } from '../../degree'

export enum ScaleIds {
  MajorTriad,
  MinorTriad,
  MajorPentatonic,
  MinorPentatonic,
  Major,
  Mixolydian,
  Dorian,
  Aeolian,
  Phrygian,
  Locrian,
  Lydian,
  HarmonicMinor,
}

export type Scale = {
  readonly id: ScaleIds
  readonly label: string
  readonly degrees: ReadonlyArray<DegreeIds>
  readonly category: ScaleCategory
}

export enum ScaleCategory {
  Scale,
  Chord,
}
