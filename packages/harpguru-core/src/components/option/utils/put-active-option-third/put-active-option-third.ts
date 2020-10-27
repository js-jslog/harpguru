import { OptionIds } from '../../../../types'

export const putActiveOptionThird = (
  orderedOptionIds: ReadonlyArray<OptionIds>,
  activeOptionId: OptionIds
): ReadonlyArray<OptionIds> => {
  const activeIdPos = orderedOptionIds.indexOf(activeOptionId)
  const { length } = orderedOptionIds
  const activeFirstOrderedList = [
    ...orderedOptionIds.slice(activeIdPos),
    ...orderedOptionIds.slice(0, activeIdPos),
  ]
  if (length < 4) return activeFirstOrderedList
  const activeThirdOrderedList = [
    ...activeFirstOrderedList.slice(length - 2),
    ...activeFirstOrderedList.slice(0, length - 2),
  ]

  return activeThirdOrderedList
}
