export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  Bend1 = 'BEND1',
  Bend2 = 'BEND2',
  Bend3 = 'BEND3',
  Overblow1 = 'OVERBLOW1',
}

export interface Interaction {
  readonly id: InteractionIds;
}

export type InteractionRow = ReadonlyArray<Interaction | undefined>
export type InteractionMatrix = ReadonlyArray<InteractionRow>
