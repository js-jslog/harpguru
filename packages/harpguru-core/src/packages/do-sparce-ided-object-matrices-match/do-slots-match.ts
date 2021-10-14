import type { IdedObject } from './types'

export const doSlotsMatch = (
  object1: IdedObject | undefined,
  object2: IdedObject | undefined
): boolean => {
  if (object1 === undefined && object2 === undefined) return true
  if (object1 === undefined || object2 === undefined) return false
  return object1.id === object2.id
}
