export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  Bend1 = 'BEND1',
  Bend2 = 'BEND2',
  Bend3 = 'BEND3',
  BlowBend1 = 'BLOWBEND1',
  BlowBend2 = 'BLOWBEND2',
  OverDraw1 = 'OVERDRAW1',
  OverBlow1 = 'OVERBLOW1',
}

export interface Interaction {
  readonly id: InteractionIds;
}

export type InteractionRow = ReadonlyArray<Interaction | undefined>
export type InteractionMatrix = ReadonlyArray<InteractionRow>
