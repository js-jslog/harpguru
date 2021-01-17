import type { OptionStackProps } from '../../types'

export const areOptionStacksEqual = (
  { stackPropsz: prevProps }: OptionStackProps,
  { stackPropsz: nextProps }: OptionStackProps
): boolean => {
  // TODO: Add more tests
  // Tests whether another list has been added to the stack
  if (prevProps.length !== nextProps.length) return false
  // If we want to include this test then we need to ensure that React.useCallback
  // wraps the tap handlers being passed in.
  if (prevProps[0].itemTapHandler !== nextProps[0].itemTapHandler) return false
  return true
}
