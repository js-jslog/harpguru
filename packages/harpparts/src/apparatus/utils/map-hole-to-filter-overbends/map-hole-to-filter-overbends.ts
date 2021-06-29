import type { Hole } from '../../types'

export const mapHoleToFilterOverbends = (
  hole: Hole,
  index: number,
  array: Hole[]
): Hole => {
  const leftHole = array[index - 1] || undefined
  const rightHole = array[index + 1] || undefined

  const leftAdjacentSimpleTones = leftHole
    ? [
      leftHole.blow,
      leftHole.draw,
      ...leftHole.blowbends,
      ...leftHole.drawbends,
      ...leftHole.valvedblows,
      ...leftHole.valveddraws,
    ]
    : []
  const rightAdjacentSimpleTones = rightHole
    ? [
      rightHole.blow,
      rightHole.draw,
      ...rightHole.blowbends,
      ...rightHole.drawbends,
      ...rightHole.valvedblows,
      ...rightHole.valveddraws,
    ]
    : []

  const filteredOverblows = hole.overblows.filter(
    (tone) =>
      !leftAdjacentSimpleTones.includes(tone) &&
      !rightAdjacentSimpleTones.includes(tone)
  )
  const filteredOverdraws = hole.overdraws.filter(
    (tone) =>
      !leftAdjacentSimpleTones.includes(tone) &&
      !rightAdjacentSimpleTones.includes(tone)
  )

  return {
    ...hole,
    overblows: filteredOverblows,
    overdraws: filteredOverdraws,
  }
}
