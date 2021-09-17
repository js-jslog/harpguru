import { DegreeIds } from 'harpparts'

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
}

export type SizeScheme = {
  readonly 0: number
  readonly 1: number
  readonly 2: number
  readonly 3: number
  readonly 4: number
  readonly 5: number
  readonly 6: number
  readonly 7: number
  readonly 8: number
  readonly 9: number
  readonly 10: number
  readonly 11: number
  readonly columnWidth: number
  readonly rowHeight: number
  readonly fragmentGutter: number
  readonly labelProtrusion: number
  readonly labelIconSize: number
}

export type SizeSchemes = {
  dynamicSizes: SizeScheme
  staticSizes: SizeScheme
}
