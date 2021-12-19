import type { XRange } from '../../../../types'

type RootColumnsMask = ReadonlyArray<boolean>
type ColumnRange = XRange
export type ColumnRanges = ReadonlyArray<ColumnRange>

export const getOctaveColumnGroups = (
  rootColumnsMask: RootColumnsMask
): ColumnRanges => {
  const columnIndexes = Array.from(Array(rootColumnsMask.length).keys())

  const indexGroups = rootColumnsMask.map((hasRoot, index, array) => {
    if (!hasRoot && index !== 0) return []
    const { [index - 1]: prev } = array
    const { [index + 1]: next } = array
    if (hasRoot && next === true && prev === false) return []
    if (hasRoot && next === undefined && prev === false) return []
    if (hasRoot && next === true && prev === true)
      return columnIndexes.slice(index, index + 1)

    const nextFalseIndex =
      array.indexOf(false, index) > -1
        ? array.indexOf(false, index)
        : array.length
    const nextUngroupedTrue =
      array.indexOf(true, nextFalseIndex) > -1
        ? array.indexOf(true, nextFalseIndex)
        : array.length
    const groupEndIndex =
      array[nextUngroupedTrue + 1] === true ||
      array[nextUngroupedTrue + 1] === undefined
        ? nextUngroupedTrue + 1
        : nextUngroupedTrue

    return columnIndexes.slice(index, groupEndIndex)
  })

  return indexGroups.filter((group) => group.length > 0)
}
