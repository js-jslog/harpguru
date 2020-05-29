import type { Degree } from '../types'
import { DegreeIds } from '../types'

export const getAscendingDegreeIds = (originId: DegreeIds = DegreeIds.Root): ReadonlyArray<DegreeIds> => {
  const ascendingDegreeIds = Object.values(DegreeIds)

  const originIndex = ascendingDegreeIds.indexOf(originId)

  const head = [ ...ascendingDegreeIds.slice(originIndex) ]
  const tail = [ ...ascendingDegreeIds.slice(0, (originIndex)) ]

  return [ ...head, ...tail ]
}

export const getDescendingDegreeIds = (originId: DegreeIds = DegreeIds.Root): ReadonlyArray<DegreeIds> => {
  const ascendingDegreeIds = getAscendingDegreeIds(originId)
  const [ , ...ascendingWithoutOrigin ] = ascendingDegreeIds
  const descendingWithoutOrigin = [ ...ascendingWithoutOrigin ].reverse()

  return [ originId, ...descendingWithoutOrigin ]
}

export const getDegree = (degreeId: DegreeIds): Degree => ({ id: degreeId })
