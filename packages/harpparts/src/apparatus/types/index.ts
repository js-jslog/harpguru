import { ValvingIds } from '../../valving'
import type { HarpFaceMatrix, HalfstepIndex } from '../../types'
import { TuningIds } from '../../tuning'
import type { Interaction } from '../../interaction'

export type ReedPair = readonly [HalfstepIndex, HalfstepIndex]

export type ReedPairArray = ReedPairArray7 | ReedPairArray10

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

export type HoleArray = HoleArray7 | HoleArray10

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

export type MatrixSpecs = {
  readonly height: number
  readonly blowRow: number
}

export type Apparatus = {
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}
