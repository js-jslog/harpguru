import type Dispatcher from 'reactn/types/dispatcher'
import { useGlobal, useDispatch } from 'reactn'
import React, { useEffect } from 'react'
import type { DegreeIds } from 'harpparts'

import { rebufferForInput } from '../utils'
import { FlushChannels } from '../../../types'
import type { GlobalState, MenuProps } from '../../../types'
import { useFlushBufferedActivityToggles } from '../../../hooks'

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

  return React.useCallback(
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
