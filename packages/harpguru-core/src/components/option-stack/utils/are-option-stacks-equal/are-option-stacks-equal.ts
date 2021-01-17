import type { OptionStackProps } from '../../types'

export const areOptionStacksEqual = (
  { optionPropsz: prevPropsz }: OptionStackProps,
  { optionPropsz: nextPropsz }: OptionStackProps
): boolean => {
  // TODO: Add more tests
  // Tests whether another list has been added to the stack
  if (prevPropsz.length !== nextPropsz.length) return false
  // If we want to include this test then we need to ensure that React.useCallback
  // wraps the tap handlers being passed in.
  if (prevPropsz[0].itemTapHandler !== nextPropsz[0].itemTapHandler)
    return false
  return true
}
