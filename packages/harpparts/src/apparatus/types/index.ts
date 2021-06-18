import type { HarpFaceMatrix, HalfstepIndex } from '../../types'
import { TuningIds } from '../../tuning'
import type { Interaction } from '../../interaction'

export type ReedPair = [HalfstepIndex, HalfstepIndex]

export type ReedPairArray = [
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair
]

export type Hole = {
  readonly blow: HalfstepIndex
  readonly draw: HalfstepIndex
  readonly bends: HalfstepIndex[]
  readonly blowbends: HalfstepIndex[]
  readonly overblows: HalfstepIndex[]
  readonly overdraws: HalfstepIndex[]
}

export type HoleArray = [
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole
]

export type MatrixSpecs = {
  readonly height: number
  readonly blowRow: number
}

export type Apparatus = {
  readonly id: TuningIds
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}
