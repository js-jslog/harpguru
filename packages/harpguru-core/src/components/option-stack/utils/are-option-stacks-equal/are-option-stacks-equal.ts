import type { OptionStackProps } from '../../types'

export const areOptionStacksEqual = (
  { optionPropsz: prevPropsz }: OptionStackProps,
  { optionPropsz: nextPropsz }: OptionStackProps
): boolean => {
  // Tests whether another option has been added to the stack
  if (prevPropsz.length !== nextPropsz.length) return false

  // It's important to return this early before the iterative
  // tests which happen later are performed so that we can
  // don't have to confuse that logic with protective statements
  // in case the arrays aren't the same length
  //
  // (this is relevant *once* we have more granular tests of
  // the items included here) TODO: add these
  const areListLengthsEqual = prevPropsz.every(
    ({ items: prevItems }, index) =>
      prevItems.length === nextPropsz[index].items.length
  )
  if (!areListLengthsEqual) return false

  const areTitlesEqual = prevPropsz.every(
    (prevProps, index) => prevProps.title === nextPropsz[index].title
  )
  const areUseSubTitlesEqual = prevPropsz.every(
    (prevProps, index) =>
      prevProps.useSubTitle === nextPropsz[index].useSubTitle
  )
  const areItemTapHandlersEqual = prevPropsz.every(
    (prevProps, index) =>
      prevProps.itemTapHandler === nextPropsz[index].itemTapHandler
  )

  return areTitlesEqual && areUseSubTitlesEqual && areItemTapHandlersEqual
}
