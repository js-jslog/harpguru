import type { GlobalTuple } from 'reactn/types/use-global'
import type { State } from 'reactn/default'
import { useGlobal } from 'reactn'
import React from 'react'
import { render } from '@testing-library/react-native'

// This component is only designed to give non component contexts a
// way to call the useGlobal hook and inspect the global state.
export const espyGlobalTuple = (): Record<
  'globalTuple',
  GlobalTuple<State>
> => {
  const blankState = {} as State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const blankSetState = (_arg0: State) => {
    return
  }
  const globalWrapper = {
    globalTuple: [blankState, blankSetState],
  } as Record<'globalTuple', GlobalTuple<State>>
  const StateInformantComponent = (): null => {
    const globalTuple: GlobalTuple<State> = useGlobal()
    globalWrapper.globalTuple = globalTuple
    return null
  }
  render(<StateInformantComponent />)
  return globalWrapper
}
