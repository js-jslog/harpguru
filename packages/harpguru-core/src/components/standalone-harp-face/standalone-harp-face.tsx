import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps } from 'harpstrata'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { NotifyOfScale } from '../notify-of-scale'
import { HarpFaces } from '../harp-faces'
import { CellInteractionContext } from '../harp-cell'
import { CallbackOnSourceGlobalProps } from '../callback-on-sourceglobalprops'
import { ActivityLegend } from '../activity-legend'
import { getColors, reduceToResizedSizes } from '../../utils'
import type { DisplayModes } from '../../types'
import { StoreProvider, useHarpGuruStoreInstance } from '../../store'
import { setFrameDimensions } from '../../packages/get-window-dimensions'

export type StandaloneHarpFaceProps = {
  readonly harpStrataProps: HarpStrataProps
  readonly displayMode: DisplayModes
  // Cells toggle when tapped, and a new scale flashes its name. Off for a
  // page whose controls choose the setup, since configuration and cell
  // interaction never share a page.
  readonly isInteractive: boolean
}

// One harp face, outside the app: its own store, the derivation that fans the
// harp strata out into every other field, and the response to being resized.
// It fills its parent and sizes itself to fit it, so a page can put its own
// controls around it. One per page, since the size it measures is shared by
// every harp face in the window.
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
  const store = useHarpGuruStoreInstance()
  const [isMeasured, setIsMeasured] = useState(false)
  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    setFrameDimensions({ width, height })
    store.setState(reduceToResizedSizes)
    setIsMeasured(true)
  }
  useEffect(() => () => setFrameDimensions(undefined), [])

  const styles = StyleSheet.create({
    fill: {
      ...StyleSheet.absoluteFill,
      backgroundColor: getColors().pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View
      style={styles.fill}
      onLayout={onLayout}
      testID="standalone-harp-face"
    >
      <CallbackOnSourceGlobalProps />
      <ToggleBufferFlusher />
      {/* Nothing is drawn until the space is known, or the first frame would
          be sized to the whole window */}
      {isMeasured && (
        <>
          <ActivityLegend />
          <HarpFaces />
          {isInteractive && <NotifyOfScale isScalesMenu={false} />}
        </>
      )}
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
