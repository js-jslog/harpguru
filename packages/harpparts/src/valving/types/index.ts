export enum ValvingIds {
  NotValved = 'Not valved',
  HalfValved = 'Half valved',
}

export type Valving = {
  readonly id: ValvingIds
}
