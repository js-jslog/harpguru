import { useGlobal } from 'reactn'
import { getHarpStrata, getApparatusIds } from 'harpstrata'
import type { HarpStrata, ApparatusIds } from 'harpstrata'

import {
  partiallyApplyNudgeFunction,
  getPropsForHarpStrata,
} from '../../../../utils'
import { DisplayModes } from '../../../../types'
import type { SetActiveHarpStrata } from '../../../../types'

export const useNudgeHarpStrataByApparatus = (): ((
  arg0: 'UP' | 'DOWN'
) => void) => {
  const [activeHarpStrata, setActiveHarpStrata] = useGlobal('activeHarpStrata')

  return partiallyApplyNudgeFunction(nudgeHarpStrataByApparatus, {
    activeHarpStrata,
    setActiveHarpStrata,
  })
}

type PartialParams = {
  readonly activeHarpStrata: HarpStrata
  readonly setActiveHarpStrata: SetActiveHarpStrata
}

const nudgeHarpStrataByApparatus = (
  partialParams: PartialParams,
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
