import { doSlotsMatch } from './do-slots-match'

import type { SparceIdedObjectRow } from './types'

export const doRowsMatch = (
  row1: SparceIdedObjectRow,
  row2: SparceIdedObjectRow
): boolean => {
  if (row1.length !== row2.length) return false
  const row1Match = row1.every((obj, index) => doSlotsMatch(obj, row2[index]))
  const row2Match = row2.every((obj, index) => doSlotsMatch(obj, row1[index]))
  return row1Match && row2Match
}
