import type { OptionStackProps } from '../../types'

export const areOptionStacksEqual = (
  { optionPropsz: prevPropsz }: OptionStackProps,
  { optionPropsz: nextPropsz }: OptionStackProps
): boolean => {
  // Tests whether another option has been added to the stack
  if (prevPropsz.length !== nextPropsz.length) return false

  const areItemTapHandlersEqual = prevPropsz.every(
    (optionProps, index) =>
      optionProps.itemTapHandler === nextPropsz[index].itemTapHandler
  )

  return areItemTapHandlersEqual
}
