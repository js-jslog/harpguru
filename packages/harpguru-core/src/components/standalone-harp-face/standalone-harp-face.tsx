import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import type { ReactElement } from 'react'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { NotifyOfScale } from '../notify-of-scale'
import { HarpFaces } from '../harp-faces'
import { CellInteractionContext } from '../harp-cell'
import { CallbackOnSourceGlobalProps } from '../callback-on-sourceglobalprops'
import { ActivityLegend } from '../activity-legend'
import { getColors } from '../../utils'
import type { DisplayModes } from '../../types'
import { StoreProvider, useHarpGuruStoreInstance } from '../../store'

export type StandaloneHarpFaceProps = {
  readonly harpStrataProps: HarpStrataProps
  readonly displayMode: DisplayModes
  // Cells toggle when tapped, and a new scale flashes its name. Off for a
  // page whose controls choose the setup, since configuration and cell
  // interaction never share a page.
  readonly isInteractive: boolean
}

// One harp face, outside the app: its own store, the derivation that fans the
// harp strata out into every other field, and the response to a resized
// window. It fills its parent, and sizes itself from the window, so it
// expects to be most of the window, as it is in a widget page or an iframe.
export const StandaloneHarpFace = (
  props: StandaloneHarpFaceProps
): ReactElement => {
  const { harpStrataProps, displayMode, isInteractive } = props

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider
        pageNumber={1}
        initialSetup={{ harpStrataProps, displayMode }}
      >
        <CellInteractionContext.Provider value={isInteractive}>
          <StandaloneHarpFaceContents {...props} />
        </CellInteractionContext.Provider>
      </StoreProvider>
    </GestureHandlerRootView>
  )
}

const StandaloneHarpFaceContents = ({
  harpStrataProps,
  displayMode,
  isInteractive,
}: StandaloneHarpFaceProps): ReactElement => {
  useFollowProps(harpStrataProps, displayMode)

  const styles = StyleSheet.create({
    fill: {
      ...StyleSheet.absoluteFill,
      backgroundColor: getColors().pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.fill}>
      <ActivityLegend />
      <HarpFaces />
      <ToggleBufferFlusher />
      <CallbackOnSourceGlobalProps />
      {isInteractive && <NotifyOfScale isScalesMenu={false} />}
    </View>
  )
}

// The store is made from the first props. When the setup it is given changes
// afterwards, such as from a tuning page's controls, the store follows it.
// Cell taps change the store's harp strata without changing the props, so
// they are left alone until the setup itself changes.
const useFollowProps = (
  harpStrataProps: HarpStrataProps,
  displayMode: DisplayModes
): void => {
  const store = useHarpGuruStoreInstance()
  const setupKey = JSON.stringify(harpStrataProps)
  const isFirstRender = React.useRef(true)

  useEffect(() => {
    if (isFirstRender.current) return
    store.setState({ activeHarpStrata: getHarpStrata(harpStrataProps) })
  }, [store, setupKey])

  useEffect(() => {
    if (isFirstRender.current) return
    store.setState({ activeDisplayMode: displayMode })
  }, [store, displayMode])

  useEffect(() => {
    isFirstRender.current = false
  }, [])
}
