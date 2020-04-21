export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  Bend1 = 'BEND1',
  Bend2 = 'BEND2',
  Bend3 = 'BEND3',
  Overblow1 = 'OVERBLOW1',
  Overblow2 = 'OVERBLOW2',
}

export interface Interaction {
  readonly id: InteractionIds;
}

export type InteractionMask = ReadonlyArray<Interaction>
