import { isProd } from '../is-prod'
import type { OptionStackProps } from '../../types'

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
  if (!areListLengthsEqual) {
    if (!isProd()) return false

    throw Error(`
The memoised OptionStack components should be initialised with
parameters which never go stale. Please check the params provided
to this OptionStack.

One of the option lists has changed length during this render.
    `)
  }

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

  if (
    (areTitlesEqual && areUseSubTitlesEqual && areItemTapHandlersEqual) === true
  )
    return true

  if (!isProd()) return false

  throw Error(`
The memoised OptionStack components should be initialised with
parameters which never go stale. Please check the params provided
to this OptionStack.

areTitlesEqual: ${areUseSubTitlesEqual}
areUseSubTitlesEqual: ${areUseSubTitlesEqual}
areItemTapHandlersEqual: ${areUseSubTitlesEqual}
  `)
}
