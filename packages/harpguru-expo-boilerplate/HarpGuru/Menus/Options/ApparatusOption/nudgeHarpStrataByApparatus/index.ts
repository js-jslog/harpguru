import { getHarpStrata, getApparatusIds } from 'harpstrata'
import type { ApparatusIds } from 'harpstrata'

import type { ApparatusOptionProps } from '../types'
import { getPropsForHarpStrata } from '../../../../helpers'
import { DisplayModes } from '../../../../HarpFace'

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

export const nudgeHarpStrataByApparatus = (
  partialParams: ApparatusOptionProps,
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
