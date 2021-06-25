export enum InteractionIds {
  Blow = 'BLOW',
  Draw = 'DRAW',
  BlowBend1 = 'BLOWBEND1',
  BlowBend2 = 'BLOWBEND2',
  BlowBend3 = 'BLOWBEND3',
  BlowBend4 = 'BLOWBEND4',
  BlowBend5 = 'BLOWBEND5',
  DrawBend1 = 'DRAWBEND1',
  DrawBend2 = 'DRAWBEND2',
  DrawBend3 = 'DRAWBEND3',
  DrawBend4 = 'DRAWBEND4',
  DrawBend5 = 'DRAWBEND5',
  OverBlow1 = 'OVERBLOW1',
  OverBlow2 = 'OVERBLOW2',
  OverDraw1 = 'OVERDRAW1',
  OverDraw2 = 'OVERDRAW2',
  ValvedBlow1 = 'VALVEDBEND1',
  ValvedDraw1 = 'VALVEDDRAW1',
}

export type Interaction = {
  readonly id: InteractionIds
}
