import { isProd } from '../is-prod'
import type { OptionStackProps } from '../../../../types'

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
  // TODO: Add check that the useItems functions are identical
  // and update the layout and scales menu's to wrap their
  // useItems function is callback memos and see that without
  // them the animation values are reset each time a value is
  // selected.
  // Don't forget to include `areUseItems...` in the error message below.
  // TODO: Add check for the twoColumns, useLeftColumnLabel and useRightColumnLabel
  // too.

  if (areTitlesEqual === true) return true

  if (!isProd()) return false

  throw Error(`
The memoised OptionStack components should be initialised with
parameters which never go stale. Please check the params provided
to this OptionStack.

areTitlesEqual: ${areTitlesEqual}
  `)
}
