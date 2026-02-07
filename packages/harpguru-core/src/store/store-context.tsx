import { useStore } from 'zustand'
import React, { createContext, useContext, useRef } from 'react'

import type { ChildrenProps, PageNumber } from '../types'

import type { HarpGuruStore, HarpGuruStoreInstance } from './create-harp-guru-store'
import { createHarpGuruStore } from './create-harp-guru-store'

const StoreContext = createContext<HarpGuruStoreInstance | null>(null)

type StoreProviderProps = ChildrenProps & {
  readonly pageNumber: PageNumber
}

export const StoreProvider = ({
  children,
  pageNumber,
}: StoreProviderProps): React.ReactElement => {
  const storeRef = useRef<HarpGuruStoreInstance | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createHarpGuruStore(pageNumber)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useHarpGuruStore<T>(
  selector: (state: HarpGuruStore) => T
): T {
  const store = useContext(StoreContext)
  if (store === null) {
    throw new Error('useHarpGuruStore must be used within a StoreProvider')
  }
  return useStore(store, selector)
}

export function useHarpGuruStoreInstance(): HarpGuruStoreInstance {
  const store = useContext(StoreContext)
  if (store === null) {
    throw new Error(
      'useHarpGuruStoreInstance must be used within a StoreProvider'
    )
  }
  return store
}
