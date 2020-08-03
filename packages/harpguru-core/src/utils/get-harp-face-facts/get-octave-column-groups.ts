import type { XRange } from '../../types'

type RootColumnsMask = ReadonlyArray<boolean>
type ColumnRange = XRange
export type ColumnRanges = ReadonlyArray<ColumnRange>

export const getOctaveColumnGroups = (
  rootColumnsMask: RootColumnsMask
): ColumnRanges => {
  const columnIndexes = Array.from(Array(rootColumnsMask.length).keys())

  // This initlal map pass gathers all of the indexes following a root-containing
  // column together at each index. For non-root-containing indexes this group
  // will be empty, and for successive root-containing columns, the algorithm
  // is configured to search *past* consecutive root-containing columns, and
  // stop gathering at the next root-containing column after that sequence.
  // This will result in some duplicate indexes gatherd in successive groups.
  // These are then dealt with in the next part of the function where filtering
  // is applied.
  const overlappingGroups = rootColumnsMask.map((hasRoot, index) => {
    if (!hasRoot && index !== 0) return []

    const endOfTrueRun = rootColumnsMask.indexOf(false, index)
    const nextIndex = rootColumnsMask.indexOf(true, endOfTrueRun)

    if (nextIndex === -1 || nextIndex === index)
      return columnIndexes.slice(index)

    return columnIndexes.slice(index, nextIndex)
  })

  // This filter removes the empty groups and the groups which
  // contain indexes which are already found in previous groups.
  return overlappingGroups.filter((group, index) => {
    const { length: groupLength } = group
    const isEmpty = groupLength === 0

    const { [index - 1]: previousGroup } = overlappingGroups
    const hasDuplicates =
      previousGroup && previousGroup.indexOf(group[0]) !== -1

    return !isEmpty && !hasDuplicates
  })
}
