import type { Hole } from '../../types'

export const mapHoleToFilterIfValved = (hole: Hole): Hole => {
  const filteredForBlows =
    hole.valvedblows.length === 0
      ? hole
      : { ...hole, blowbends: [], overblows: [] }
  const filteredFurtherForDraws =
    filteredForBlows.valveddraws.length === 0
      ? filteredForBlows
      : { ...filteredForBlows, drawbends: [], overdraws: [] }

  return filteredFurtherForDraws
}
