import { OptionIds } from '../../../../types'

type OptionDisplayList = [
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined,
  OptionIds | undefined
]

export const selectSixOptions = (
  orderedOptionIds: ReadonlyArray<OptionIds>
): OptionDisplayList => {
  if (orderedOptionIds.length <= 4) {
    const arrayToFill = [0, 0, 0, 0, 0, 0]
    const retVal = arrayToFill.map((_element, index) => {
      if (orderedOptionIds[index]) return orderedOptionIds[index]
      return undefined
    }) as OptionDisplayList

    return [...retVal.slice(4), ...retVal.slice(0, 4)] as OptionDisplayList
  }

  if (orderedOptionIds.length === 5)
    return [
      undefined,
      ...orderedOptionIds.slice(4),
      ...orderedOptionIds.slice(0, 4),
    ] as OptionDisplayList

  return orderedOptionIds.slice(0, 6) as OptionDisplayList
}
