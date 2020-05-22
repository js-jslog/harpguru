import type { HarpStrata, HarpStrataProps } from 'harpstrata'

export const getPropsForHarpStrata = (harpStrata: HarpStrata): HarpStrataProps => {
  const { apparatus: { id: apparatusId }} = harpStrata
  const { pozitionId } = harpStrata
  const { harpKeyId } = harpStrata
  const { isActiveComplex: { activeDegreeIds: activeIds }} = harpStrata

  const harpStrataProps = {
    apparatusId, pozitionId, harpKeyId, activeIds
  }

  return harpStrataProps
}
