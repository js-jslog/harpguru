import { getHarpStrata } from 'harpstrata'
import type { Setup } from 'harpstrata'
import { getDegreeIds, getPozition, getScaleByDegreeIds } from 'harpparts'
import type { DegreeIds, PitchIds } from 'harpparts'

export type SetupSummaryDegree = {
  readonly id: DegreeIds
  readonly label: string
  readonly isActive: boolean
}

// What a setup link holds, in words and in the legend's degrees, for a
// person to check before it changes anything
export type SetupSummary = {
  readonly title: string
  readonly harpKey: string
  readonly position: string
  readonly songKey: string
  readonly tuning: string
  readonly degrees: ReadonlyArray<SetupSummaryDegree>
}

// 'Bb' as 'B♭'
const writePitch = (pitchId: PitchIds): string => pitchId.replace(/b$/, '♭')

// '3b' as '♭3'
const writeDegree = (degreeId: DegreeIds): string =>
  degreeId.endsWith('b') ? `♭${degreeId.slice(0, -1)}` : degreeId

export const getSetupSummary = ({ harpStrataProps }: Setup): SetupSummary => {
  const { activeDegreeIds, rootPitchId, harpKeyId, pozitionId } =
    getHarpStrata(harpStrataProps)
  const scale = getScaleByDegreeIds(activeDegreeIds)
  const title =
    scale !== undefined
      ? scale.label
      : activeDegreeIds.length === 0
        ? 'No notes lit'
        : 'Your own selection'
  const {
    simpleSplitValue: [number, suffix],
  } = getPozition(pozitionId)

  return {
    title,
    harpKey: writePitch(harpKeyId),
    position: `${number}${suffix}`,
    songKey: writePitch(rootPitchId),
    tuning: harpStrataProps.tuningId,
    degrees: getDegreeIds().map((id) => ({
      id,
      label: writeDegree(id),
      isActive: activeDegreeIds.includes(id),
    })),
  }
}
