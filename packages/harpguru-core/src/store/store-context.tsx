import { useStore } from 'zustand'
import React, { createContext, useContext, useRef } from 'react'

import type { ChildrenProps, PageNumber } from '../types'
import type { InitialSetup } from '../components/harp-guru/utils'

import type { HarpGuruStore, HarpGuruStoreInstance } from './create-harp-guru-store'
import { createHarpGuruStore } from './create-harp-guru-store'

const StoreContext = createContext<HarpGuruStoreInstance | null>(null)

type StoreProviderProps = ChildrenProps & {
  readonly pageNumber: PageNumber
  // Read once, when the store is made. Later changes go through the store.
  readonly initialSetup?: InitialSetup
  // A store made by the parent, which needs to reach it from outside, such
  // as the app handing a setup link to the harp face it is opened in. When
  // given, pageNumber and initialSetup are not used.
  readonly store?: HarpGuruStoreInstance
}

export const StoreProvider = ({
  children,
  pageNumber,
  initialSetup,
  store,
}: StoreProviderProps): React.ReactElement => {
  const storeRef = useRef<HarpGuruStoreInstance | null>(store ?? null)
  if (storeRef.current === null) {
    storeRef.current = createHarpGuruStore(pageNumber, initialSetup)
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
