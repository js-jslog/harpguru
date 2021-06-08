import type { Hole } from '../../types'

export const filterPointlessOverbends = (
  hole: Hole,
  index: number,
  array: Hole[]
): Hole => {
  const leftHole = array[index - 1] || undefined
  const rightHole = array[index + 1] || undefined

  const leftAdjacentSimpleTones = leftHole
    ? [leftHole.blow, leftHole.draw, ...leftHole.bends, ...leftHole.blowBends]
    : []
  const rightAdjacentSimpleTones = rightHole
    ? [
      rightHole.blow,
      rightHole.draw,
      ...rightHole.bends,
      ...rightHole.blowBends,
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
