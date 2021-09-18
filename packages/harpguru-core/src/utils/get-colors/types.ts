import type { DegreeIds } from 'harpparts'

type DegreeColors = {
  readonly [DegreeIds.Root]: string
  readonly [DegreeIds.Flat2]: string
  readonly [DegreeIds.Second]: string
  readonly [DegreeIds.Flat3]: string
  readonly [DegreeIds.Third]: string
  readonly [DegreeIds.Fourth]: string
  readonly [DegreeIds.Flat5]: string
  readonly [DegreeIds.Fifth]: string
  readonly [DegreeIds.Flat6]: string
  readonly [DegreeIds.Sixth]: string
  readonly [DegreeIds.Flat7]: string
  readonly [DegreeIds.Seventh]: string
}
export type ColorSheme = {
  readonly degreeColors: DegreeColors
  readonly pageColor: string
  readonly homeRowsColor: string
  readonly inertOutline: string
  readonly activeOutline: string
  readonly holeNumbersColor: string
  readonly harpguruPink: string
  readonly harpguruGold: string
  readonly harpguruDarkGold: string
}
