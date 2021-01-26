import type { Pozition } from '../pozition'
import type { Pitch } from '../pitch'

export enum HarpPartTypes {
  Pitch,
  Pozition,
}

export type HarpPart = Pitch | Pozition

export type HalfstepIndex = number

export type HarpFaceRow<T> = ReadonlyArray<T | undefined>
export type HarpFaceMatrix<T> = ReadonlyArray<HarpFaceRow<T>>
