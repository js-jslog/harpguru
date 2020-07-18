import { getHarpStrata, getApparatusIds } from 'harpstrata'
import type { HarpStrata, ApparatusIds } from 'harpstrata'

import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../helpers'
import { getPropsForHarpStrata } from '../../../../helpers'

const getNextId = (
  apparatusId: ApparatusIds,
  direction: 'UP' | 'DOWN'
): ApparatusIds => {
  const apparatusIdList = getApparatusIds()
  const apparatusIdIndex = apparatusIdList.indexOf(apparatusId)

  if (direction === 'UP') {
    const [, nextApparatusId] = [
      ...apparatusIdList.slice(apparatusIdIndex),
      ...apparatusIdList.slice(0, apparatusIdIndex),
    ]
    return nextApparatusId
  }
  const [previousApparatusId] = [
    ...apparatusIdList.slice(apparatusIdIndex),
    ...apparatusIdList.slice(0, apparatusIdIndex),
  ].reverse()
  return previousApparatusId
}

type Props = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}

export const nudgeHarpStrataByApparatus = (
  partialParams: Props,
  direction: 'UP' | 'DOWN'
): void => {
  const { activeHarpStrata, setActiveHarpStrata } = partialParams
  const {
    apparatus: { id: apparatusId },
  } = activeHarpStrata

  const nextHarpStrataProps = getPropsForHarpStrata(
    {
      ...activeHarpStrata,
      apparatus: {
        ...activeHarpStrata.apparatus,
        id: getNextId(apparatusId, direction),
      },
    },
    DisplayModes.Degree
  )

  setActiveHarpStrata(getHarpStrata(nextHarpStrataProps))
}
