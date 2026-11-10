import { getHarpStrata } from 'harpstrata'
import { DegreeIds, InteractionIds, PitchIds, ValvingIds } from 'harpparts'
import type { PozitionIds, TuningIds } from 'harpparts'

type HomeHole = {
  readonly hole: number
  readonly interaction: 'blow' | 'draw'
}

// Where a pozition's root sits among a tuning's unbent notes, in hole order,
// blow before draw in the same hole. Read from the reeds so the page can't
// disagree with them. A chromatic harp's slide is left out: home is where the
// root is with the slide out.
export const getHomeHoles = (
  tuningId: TuningIds,
  pozitionId: PozitionIds
): ReadonlyArray<HomeHole> => {
  const {
    apparatus: {
      interactionMatrix: { harpface1: interactions },
    },
    degreeMatrix: { harpface1: degrees },
  } = getHarpStrata({
    tuningId,
    pozitionId,
    valvingId: ValvingIds.NotValved,
    harpKeyId: PitchIds.C,
    activeIds: [],
  })
  const found: HomeHole[] = []
  interactions.forEach((row, y) =>
    row.forEach((interaction, x) => {
      const {
        [y]: { [x]: degree },
      } = degrees
      if (degree?.id !== DegreeIds.Root) return
      if (interaction?.id === InteractionIds.Blow)
        found.push({ hole: x + 1, interaction: 'blow' })
      if (interaction?.id === InteractionIds.Draw)
        found.push({ hole: x + 1, interaction: 'draw' })
    })
  )
  return found.sort(
    (a, b) =>
      a.hole - b.hole ||
      Number(a.interaction === 'draw') - Number(b.interaction === 'draw')
  )
}

// 'draw 2, blow 3, 6 and 9': holes with the same interaction run together
export const describeHomeHoles = (holes: ReadonlyArray<HomeHole>): string => {
  const runs: Array<{ interaction: string; holes: number[] }> = []
  holes.forEach(({ hole, interaction }) => {
    const { [runs.length - 1]: last } = runs
    if (last?.interaction === interaction) last.holes.push(hole)
    else runs.push({ interaction, holes: [hole] })
  })
  return runs
    .map(({ interaction, holes: runHoles }) => {
      const numbers = runHoles.map(String)
      const listed =
        numbers.length === 1
          ? numbers[0]
          : `${numbers.slice(0, -1).join(', ')} and ${numbers[numbers.length - 1]}`
      return `${interaction} ${listed}`
    })
    .join(', ')
}
