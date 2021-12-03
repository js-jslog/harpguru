import type { Pozition } from '../pozition'
import type { Pitch } from '../pitch'

export enum HarpPartTypes {
  Pitch,
  Pozition,
}

export type HarpPart = Pitch | Pozition

export type HalfstepIndex = number

type DiatonicHarpFaceFacts<T> = {
  readonly harpface1: T
}
export type ChromaticHarpFaceFacts<T> = {
  readonly harpface1: T
  readonly harpface2: T
}
export type HarpFaceFacts<T> =
  | DiatonicHarpFaceFacts<T>
  | ChromaticHarpFaceFacts<T>

export type HarpFaceRow<T> = ReadonlyArray<T | undefined>
export type HarpFaceMatrix<T> = ReadonlyArray<HarpFaceRow<T>>
export type HarpFaceMatrices<T> = HarpFaceFacts<HarpFaceMatrix<T>>
