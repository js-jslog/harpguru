export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  Bend1 = 'BEND1',
  Bend2 = 'BEND2',
  Bend3 = 'BEND3',
  Bend4 = 'BEND4',
  Bend5 = 'BEND5',
  BlowBend1 = 'BLOWBEND1',
  BlowBend2 = 'BLOWBEND2',
  BlowBend3 = 'BLOWBEND3',
  BlowBend4 = 'BLOWBEND4',
  BlowBend5 = 'BLOWBEND5',
  OverDraw1 = 'OVERDRAW1',
  OverDraw2 = 'OVERDRAW2',
  OverBlow1 = 'OVERBLOW1',
  OverBlow2 = 'OVERBLOW2',
  ValvedBlow1 = 'VALVEDBEND1',
  ValvedDraw1 = 'VALVEDDRAW1',
}

export type Interaction = {
  readonly id: InteractionIds
}
