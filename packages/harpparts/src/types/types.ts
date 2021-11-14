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
type HarpFaceMatricesDiatonic<T> = {
  harpface1: HarpFaceMatrix<T>
}
export type HarpFaceMatricesChromatic<T> = {
  harpface1: HarpFaceMatrix<T>
  harpface2: HarpFaceMatrix<T>
}
export type HarpFaceMatrices<T> =
  | HarpFaceMatricesDiatonic<T>
  | HarpFaceMatricesChromatic<T>
