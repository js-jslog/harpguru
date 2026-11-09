import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { getHarpStrata } from 'harpstrata'
import type { HarpStrataProps, Setup, SetupDisplayMode } from 'harpstrata'

import { ToggleBufferFlusher } from '../toggle-buffer-flusher'
import { NotifyOfScale } from '../notify-of-scale'
import { HarpFaces } from '../harp-faces'
import { CallbackOnSourceGlobalProps } from '../callback-on-sourceglobalprops'
import { ActivityLegend } from '../activity-legend'
import { getColors, reduceToResizedSizes } from '../../utils'
import { DisplayModes } from '../../types'
import {
  StoreProvider,
  useHarpGuruStore,
  useHarpGuruStoreInstance,
} from '../../store'

export type StandaloneHarpFaceProps = {
  // The harp and how its cells are labelled, as a setup link carries them
  readonly setup: Setup
  // Cells toggle when tapped, and a new scale flashes its name. Off for a
  // page whose controls choose the setup, since configuration and cell
  // interaction never share a page.
  readonly isInteractive: boolean
}

const toDisplayMode = (displayMode: SetupDisplayMode): DisplayModes =>
  displayMode === 'pitch' ? DisplayModes.Pitch : DisplayModes.Degree

// One harp face, outside the app: its own store, the derivation that fans the
// harp strata out into every other field, and the response to being resized.
// It fills its parent and sizes itself to fit it, so a page can put its own
// controls around it. The size it measures is kept in its own store, so
// several can share a window.
export const StandaloneHarpFace = ({
  setup,
  isInteractive,
}: StandaloneHarpFaceProps): ReactElement => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <StoreProvider
      pageNumber={1}
      initialSetup={{
        harpStrataProps: setup.harpStrataProps,
        displayMode: toDisplayMode(setup.displayMode),
        isCellInteractive: isInteractive,
      }}
    >
      <StandaloneHarpFaceContents setup={setup} />
    </StoreProvider>
  </GestureHandlerRootView>
)

const StandaloneHarpFaceContents = ({
  setup,
}: Pick<StandaloneHarpFaceProps, 'setup'>): ReactElement => {
  useFollowSetup(setup)
  const store = useHarpGuruStoreInstance()
  const isCellInteractive = useHarpGuruStore((state) => state.isCellInteractive)
  const [isMeasured, setIsMeasured] = useState(false)
  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    const frameDimensions = { width, height }
    store.setState((state) => ({
      frameDimensions,
      ...reduceToResizedSizes({ ...state, frameDimensions }),
    }))
    setIsMeasured(true)
  }

  const styles = StyleSheet.create({
    fill: {
      ...StyleSheet.absoluteFill,
      backgroundColor: getColors().pageColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.fill} onLayout={onLayout} testID="standalone-harp-face">
      <CallbackOnSourceGlobalProps />
      <ToggleBufferFlusher />
      {/* Nothing is drawn until the space is known, or the first frame would
          be sized to the whole window */}
      {isMeasured && (
        <>
          <ActivityLegend />
          <HarpFaces />
          {isCellInteractive && <NotifyOfScale isScalesMenu={false} />}
        </>
      )}
    </View>
  )
}

// The store is made from the first setup. When the setup it is given changes
// afterwards, such as from a tuning page's controls, the store follows it.
// Cell taps change the store's harp strata without changing the setup, so
// they are left alone until the setup itself changes.
const useFollowSetup = ({ harpStrataProps, displayMode }: Setup): void => {
  const store = useHarpGuruStoreInstance()
  const setupKey = JSON.stringify(harpStrataProps)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) return
    const props: HarpStrataProps = harpStrataProps
    store.setState({ activeHarpStrata: getHarpStrata(props) })
  }, [store, setupKey])

  useEffect(() => {
    if (isFirstRender.current) return
    store.setState({ activeDisplayMode: toDisplayMode(displayMode) })
  }, [store, displayMode])

  useEffect(() => {
    isFirstRender.current = false
  }, [])
}
