import { isProd } from '../is-prod'
import type { OptionStackProps } from '../../option-stack'

// This function is deliberately configured to behave differently
// in dev and prod modes. The reason for this is simple. When these
// objects are created, it is an explicit design intention that
// they will never have new objects passed to them. If this happens
// it is an exception to the intended design. If the function
// params were not wrapped in a memo for example. I want to be
// alerted quickly if I have breached that design rule.
// However, if I enforce it during development, I have no way of
// utilising hot reloading while modifying the code.
// The solution is to return false in dev mode, refreshing the
// instance, but throwing an error in production mode, alerting
// me quickly to the problem.
// This approach requires that I test the app well in production
// mode before actually publishing it. I do this as a matter of
// course.
export const areOptionStacksEqual = (
  { optionPropsz: prevPropsz }: OptionStackProps,
  { optionPropsz: nextPropsz }: OptionStackProps
): boolean => {
  // Tests whether another option has been added to the stack
  if (prevPropsz.length !== nextPropsz.length) {
    if (!isProd()) return false

    throw Error(`
The memoised OptionStack components should be initialised with
parameters which never go stale. Please check the params provided
to this OptionStack.

The number of options in the stack has changed during this render
from ${prevPropsz.length} to ${nextPropsz.length}
    `)
  }

  // TODO: change all of these checks to `some` to prevent unnecessary
  // completion of the iteration.
  const areTitlesEqual = prevPropsz.every(
    (prevProps, index) => prevProps.useTitle === nextPropsz[index].useTitle
  )
  const areItemsEqual = !prevPropsz.some(
    (prevProps, index) => prevProps.useItems !== nextPropsz[index].useItems
  )
  const areTwoColumnsEqual = !prevPropsz.some(
    (prevProps, index) => prevProps.twoColumns !== nextPropsz[index].twoColumns
  )
  const areLeftColumnLabelsEqual = !prevPropsz.some(
    (prevProps, index) =>
      prevProps.useLeftColumnLabel !== nextPropsz[index].useLeftColumnLabel
  )
  const areRightColumnLabelsEqual = !prevPropsz.some(
    (prevProps, index) =>
      prevProps.useRightColumnLabel !== nextPropsz[index].useRightColumnLabel
  )

  if (
    (areTitlesEqual &&
      areItemsEqual &&
      areTwoColumnsEqual &&
      areLeftColumnLabelsEqual &&
      areRightColumnLabelsEqual) === true
  )
    return true

  if (!isProd()) return false

  throw Error(`
The memoised OptionStack components should be initialised with
parameters which never go stale. Please check the params provided
to this OptionStack.

areTitlesEqual: ${areTitlesEqual}
areItemsEqual: ${areItemsEqual}
areTwoColumnsEqual: ${areTwoColumnsEqual}
areLeftColumnLabelsEqual: ${areLeftColumnLabelsEqual}
areRightColumnLabelsEqual: ${areRightColumnLabelsEqual}
  `)
}
