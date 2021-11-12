import { ValvingIds } from '../../valving'
import type { HarpFaceMatrix, HalfstepIndex } from '../../types'
import { TuningIds } from '../../tuning'
import type { Interaction } from '../../interaction'

export type ReedPair = readonly [HalfstepIndex, HalfstepIndex]

export type ReedPairArray =
  | ReedPairArray7
  | ReedPairArray10
  | ReedPairArray12
  | ReedPairArray13
  | ReedPairArray16

type ReedPairArray7 = readonly [
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair
]

type ReedPairArray10 = readonly [
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

type ReedPairArray12 = readonly [
  ReedPair,
  ReedPair,
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

type ReedPairArray13 = readonly [
  ReedPair,
  ReedPair,
  ReedPair,
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

type ReedPairArray16 = readonly [
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
  ReedPair,
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
  readonly blowbends: HalfstepIndex[]
  readonly drawbends: HalfstepIndex[]
  readonly overblows: HalfstepIndex[]
  readonly overdraws: HalfstepIndex[]
  readonly valvedblows: HalfstepIndex[]
  readonly valveddraws: HalfstepIndex[]
}

export type HoleArray =
  | HoleArray7
  | HoleArray10
  | HoleArray12
  | HoleArray13
  | HoleArray16

type HoleArray7 = readonly [Hole, Hole, Hole, Hole, Hole, Hole, Hole]

type HoleArray10 = readonly [
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

type HoleArray12 = readonly [
  Hole,
  Hole,
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

type HoleArray13 = readonly [
  Hole,
  Hole,
  Hole,
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

type HoleArray16 = readonly [
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
  Hole,
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
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly halfstepIndexMatrix: readonly [HarpFaceMatrix<HalfstepIndex>, HarpFaceMatrix<HalfstepIndex>]
  readonly interactionMatrix: readonly [HarpFaceMatrix<Interaction>, HarpFaceMatrix<Interaction>]
}
