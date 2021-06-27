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
  readonly blowbends: HalfstepIndex[]
  readonly drawbends: HalfstepIndex[]
  readonly overblows: HalfstepIndex[]
  readonly overdraws: HalfstepIndex[]
  readonly valvedblows: HalfstepIndex[]
  readonly valveddraws: HalfstepIndex[]
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

export enum ValvingIds {
  NotValved = 'Not valved',
  HalfValved = 'Half valved',
}

export type Apparatus = {
  readonly tuningId: TuningIds
  readonly valvingId: ValvingIds
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}
