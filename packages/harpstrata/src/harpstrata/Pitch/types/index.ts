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

export enum NoteFoundations {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
}

export type NaturalDisplayValue = {
  readonly natural: NoteFoundations;
}
export type UnnaturalDisplayValues = {
  readonly sharp: NoteFoundations;
  readonly flat: NoteFoundations;
}

export type NaturalPitch = {
  readonly id: PitchIds;
  readonly contextualDisplayValues: NaturalDisplayValue;
}
export type UnnaturalPitch = {
  readonly id: PitchIds;
  readonly contextualDisplayValues: UnnaturalDisplayValues;
}
export type Pitch = NaturalPitch | UnnaturalPitch


export type PitchRow = ReadonlyArray<Pitch | undefined>
export type PitchMatrix = ReadonlyArray<PitchRow>
