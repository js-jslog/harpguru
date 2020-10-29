import { putActiveOptionFirst } from '../put-active-option-first'
import { OptionIds } from '../../../../types'

type OptionDisplayItem = OptionIds | undefined
type OptionDisplayList = [
  OptionDisplayItem,
  OptionDisplayItem,
  OptionIds,
  OptionDisplayItem,
  OptionDisplayItem,
  OptionDisplayItem
]

const getHead = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): [OptionDisplayItem, OptionDisplayItem] => {
  const { length } = orderedOptionIds
  if (length <= 4) {
    return [undefined, undefined]
  } else if (length === 5) {
    return [undefined, orderedOptionIds[length - 1]]
  } else {
    return [orderedOptionIds[length - 2], orderedOptionIds[length - 1]]
  }
}

const getTail = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): [OptionDisplayItem, OptionDisplayItem, OptionDisplayItem] => {
  const tailTemplate = [0, 0, 0]
  const tail = tailTemplate.map((_, index) => {
    const indexIgnoringActive = index + 1
    if (orderedOptionIds[indexIgnoringActive])
      return orderedOptionIds[indexIgnoringActive]
    return undefined
  }) as [OptionDisplayItem, OptionDisplayItem, OptionDisplayItem]

  return tail
}

export const setOptionsInListOfSix = (
  orderedOptionIds: ReadonlyArray<OptionIds>,
  activeOptionId: OptionIds
): OptionDisplayList => {
  const activeFirstOrderedIds = putActiveOptionFirst(
    orderedOptionIds,
    activeOptionId
  )

  const head = getHead(activeFirstOrderedIds)
  const tail = getTail(activeFirstOrderedIds)

  return [...head, activeOptionId, ...tail] as OptionDisplayList
}
