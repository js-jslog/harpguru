import { OptionIds } from '../../../../types'

export const putActiveOptionFirst = (
  orderedOptionIds: ReadonlyArray<OptionIds>,
  activeOptionId: OptionIds
): ReadonlyArray<OptionIds> => {
  const activeIdPos = orderedOptionIds.indexOf(activeOptionId)
  const activeFirstOrderedList = [
    ...orderedOptionIds.slice(activeIdPos),
    ...orderedOptionIds.slice(0, activeIdPos),
  ]
  return activeFirstOrderedList
}
