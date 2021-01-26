import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { FlushChannels } from '../../../../types'
import type { MenuProps } from '../../../../types'
import { useFlushBufferedActivityToggles } from '../../../../hooks'

export const useImmediatelyFlushToggles = ({
  isMenuStashed,
}: Pick<MenuProps, 'isMenuStashed'>): void => {
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
}
