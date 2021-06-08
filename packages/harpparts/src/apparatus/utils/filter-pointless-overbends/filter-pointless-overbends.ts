import type { Hole } from '../../types'

export const filterPointlessOverbends = (
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
      ...(leftHole.bends || []),
      ...(leftHole.blowBends || []),
    ]
    : []
  const rightAdjacentSimpleTones = rightHole
    ? [
      rightHole.blow,
      rightHole.draw,
      ...(rightHole.bends || []),
      ...(rightHole.blowBends || []),
    ]
    : []

  const filteredOverblows = hole.overblow
    ? hole.overblow.filter(
      (tone) =>
        !leftAdjacentSimpleTones.includes(tone) &&
          !rightAdjacentSimpleTones.includes(tone)
    )
    : undefined
  const filteredOverdraws = hole.overdraw
    ? hole.overdraw.filter(
      (tone) =>
        !leftAdjacentSimpleTones.includes(tone) &&
          !rightAdjacentSimpleTones.includes(tone)
    )
    : undefined

  return {
    ...hole,
    overblow: filteredOverblows,
    overdraw: filteredOverdraws,
  }
}
