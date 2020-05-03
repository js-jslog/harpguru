export enum PitchIds {
  A = 'A',
  Bb = 'Bb',
  B = 'B',
  C = 'C',
  Db = 'Db',
  D = 'D',
  Eb = 'Eb',
  E = 'E',
  F = 'F',
  Gb = 'Gb',
  G = 'G',
  Ab = 'Ab',
}

export interface Pitch {
  readonly id: PitchIds;
}

export type PitchRow = ReadonlyArray<Pitch | undefined>
export type PitchMatrix = ReadonlyArray<PitchRow>
