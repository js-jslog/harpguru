import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'
import { getScaleByDegreeIds, ValvingIds } from 'harpparts'
import type { DegreeIds } from 'harpparts'

// The words for a setup: 'Paddy richter, Bb harp, 3rd position: plays in C',
// or without the tuning where the page is already about it.
export const describeHarp = (
  harpStrataProps: HarpStrataProps,
  { withTuning = true }: { readonly withTuning?: boolean } = {}
): string => {
  const { tuningId, harpKeyId, pozitionId, valvingId } = harpStrataProps
  const { rootPitchId } = getHarpStrata(harpStrataProps)
  const valving = valvingId === ValvingIds.HalfValved ? ', half valved' : ''
  const harp = `${harpKeyId} harp, ${pozitionId} position: plays in ${rootPitchId}`
  return withTuning ? `${tuningId}${valving}, ${harp}` : `${harp}`
}

export const describeScale = (
  degrees: ReadonlyArray<DegreeIds>
): string | undefined => getScaleByDegreeIds(degrees)?.label
