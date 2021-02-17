export enum DegreeIds {
  Root = '1',
  Flat2 = '2b',
  Second = '2',
  Flat3 = '3b',
  Third = '3',
  Fourth = '4',
  Flat5 = '5b',
  Fifth = '5',
  Flat6 = '6b',
  Sixth = '6',
  Flat7 = '7b',
  Seventh = '7',
}

export type Degree = {
  readonly id: DegreeIds
  readonly simpleSplitValue: [string, string]
}
