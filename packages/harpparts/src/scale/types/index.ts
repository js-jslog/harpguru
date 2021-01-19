import { DegreeIds } from '../../degree'

export enum ScaleIds {
  MajorTriad,
  MinorTriad,
  MajorPentatonic,
  MinorPentatonic,
  Blues,
  Major,
  Mixolydian,
  Dorian,
  Aeolian,
  Phrygian,
  Locrian,
  Lydian,
  HarmonicMinor,
  DiminishedScale,
  WholeTone,
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
