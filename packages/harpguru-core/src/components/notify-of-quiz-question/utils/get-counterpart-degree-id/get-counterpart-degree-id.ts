import { getHarpStrata } from 'harpstrata'
import type { DegreeIds, PitchIds, PozitionIds } from 'harpparts'
import { getTuningIds } from 'harpparts'

type Props = {
  readonly pitchId: PitchIds
  readonly harpKeyId: PitchIds
  readonly pozitionId: PozitionIds
}

export const getCounterpartDegreeId = (props: Props): DegreeIds => {
  const { pitchId, harpKeyId, pozitionId } = props

  const surrogateHarpStrata = getHarpStrata({
    tuningId: getTuningIds()[0],
    pozitionId,
    harpKeyId,
    activeIds: [pitchId],
  })

  const {
    activeDegreeIds: { [0]: counterpartDegree },
  } = surrogateHarpStrata

  return counterpartDegree
}
