import { useWindowDimensions } from 'react-native'
import { useEffect } from 'react'

import { reduceToResizedSizes } from '../../../utils'
import { useHarpGuruStoreInstance } from '../../../store'

// The sizes are otherwise recomputed only when the harp strata changes. On a
// device that is enough, since the landscape lock keeps the long and short
// edges the same through a rotation, and each reduction returns its previous
// value when nothing has changed. A browser window or an iframe can be resized
// at any moment, and without this the harp face keeps the size it had on
// mount.
export const useSetFromWindowDimensions = (): void => {
  const { width, height } = useWindowDimensions()
  const store = useHarpGuruStoreInstance()

  useEffect(() => {
    store.setState(reduceToResizedSizes)
  }, [store, width, height])
}
