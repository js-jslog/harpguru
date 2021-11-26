import type { Pozition } from '../pozition'
import type { Pitch } from '../pitch'

export enum HarpPartTypes {
  Pitch,
  Pozition,
}

export type HarpPart = Pitch | Pozition

export type HalfstepIndex = number

type DiatonicHarpFaceFact<T> = {
  readonly harpface1: T
}
export type ChromaticHarpFaceFact<T> = {
  readonly harpface1: T
  readonly harpface2: T
}
export type HarpFaceFact<T> = DiatonicHarpFaceFact<T> | ChromaticHarpFaceFact<T>

export type HarpFaceRow<T> = ReadonlyArray<T | undefined>
export type HarpFaceMatrix<T> = ReadonlyArray<HarpFaceRow<T>>
export type HarpFaceMatrices<T> = HarpFaceFact<HarpFaceMatrix<T>>
