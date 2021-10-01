import { useGlobal } from 'reactn'
import { useEffect } from 'react'

import { deriveColumnBounds } from '../../utils'
import { compareColumnBounds } from '../../../../utils'

export const useDeriveColumnBounds = (): void => {
  const [activeHarpStrata] = useGlobal('activeHarpStrata')
  const [prevColumnBounds, setColumnBounds] = useGlobal('columnBounds')

  useEffect(() => {
    const newColumnBounds = deriveColumnBounds(
      activeHarpStrata,
      prevColumnBounds
    )
    if (compareColumnBounds(prevColumnBounds, newColumnBounds)) return
    console.log(':::::::::::::::::::::::::::::::::: columnBounds changed')
    setColumnBounds(newColumnBounds)
  }, [activeHarpStrata, prevColumnBounds, setColumnBounds])
}
