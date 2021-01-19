import type Dispatcher from 'reactn/types/dispatcher'
import { useGlobal, useDispatch } from 'reactn'
import { useCallback, useEffect } from 'react'
import type { DegreeIds } from 'harpparts'

import { rebufferForInput } from '../../utils'
import { FlushChannels } from '../../../../types'
import type { GlobalState, MenuProps } from '../../../../types'
import { useFlushBufferedActivityToggles } from '../../../../hooks'

export const useDispatchAndFlushScaleToggles = ({
  isMenuStashed,
}: Pick<MenuProps, 'isMenuStashed'>): Dispatcher<GlobalState> => {
  const [flushChannel, setFlushChannel] = useGlobal('flushChannel')
  const [bufferedActivityToggles] = useGlobal('bufferedActivityToggles')

  useEffect(() => {
    if (!isMenuStashed) {
      setFlushChannel(FlushChannels.ScalesMenu)
    } else {
      setFlushChannel(FlushChannels.Regular)
    }
  }, [isMenuStashed, setFlushChannel])

  const flushBufferedActivityToggles = useFlushBufferedActivityToggles()
  useEffect(() => {
    if (flushChannel !== FlushChannels.ScalesMenu) return
    if (bufferedActivityToggles.length === 0) return
    flushBufferedActivityToggles()
  }, [bufferedActivityToggles, flushChannel])

  // This has to be wrapped in a memo because we are trying to
  // ensure that nothing which doesn't need to be recreated is
  // being recreated before being passed to the option-stack.
  // This ensures that the option-stack UX is persistant and
  // doesn't rerender unless absolutely necessary.
  return useCallback(
    useDispatch(
      (
        global: GlobalState,
        _dipatch,
        targetActiveDegrees: ReadonlyArray<DegreeIds>
      ): Pick<GlobalState, 'bufferedActivityToggles'> => {
        const { activeHarpStrata } = global
        const { activeDegreeIds } = activeHarpStrata

        return {
          bufferedActivityToggles: rebufferForInput(
            activeDegreeIds,
            targetActiveDegrees
          ),
        }
      }
    ),
    [useDispatch]
  )
}
