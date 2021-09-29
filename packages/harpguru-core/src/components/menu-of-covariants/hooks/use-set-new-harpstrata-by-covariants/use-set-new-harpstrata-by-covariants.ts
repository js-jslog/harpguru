import { getHarpStrata, getPropsForHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { DisplayModes } from '../../../../types'
import type { UseGlobal } from '../../../../types'

export const useSetNewHarpStrataByCovariants = (
  useGlobal: UseGlobal
): ((arg0: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')
  const [activeDisplayMode] = useGlobal('activeDisplayMode')

  const setNewHarpStrataByCovariants = (
    partialHarpStrata: Pick<HarpStrataProps, 'harpKeyId' | 'pozitionId'>
  ): void => {
    const newHarpStrataProps: HarpStrataProps = {
      ...getPropsForHarpStrata(
        activeHarpStrata,
        activeDisplayMode === DisplayModes.Pitch ? 'PITCH' : 'DEGREE'
      ),
      harpKeyId: partialHarpStrata.harpKeyId,
      pozitionId: partialHarpStrata.pozitionId,
    }

    const newHarpStrata = getHarpStrata(newHarpStrataProps)

    setActiveHarpStrata(newHarpStrata)
  }

  return setNewHarpStrataByCovariants
}
