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
import type { FrameDimensions } from '../../types'
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
  // A quarter turn clockwise, a row per hole from hole 1 at the top: draw
  // notes left of the hole numbers, blow notes right, and the legend along
  // the top. For a frame taller than wide, such as a phone held upright.
  readonly isUpright?: boolean
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
  isUpright = false,
}: StandaloneHarpFaceProps): ReactElement => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <StoreProvider
      pageNumber={1}
      initialSetup={{
        harpStrataProps: setup.harpStrataProps,
        displayMode: toDisplayMode(setup.displayMode),
        isCellInteractive: isInteractive,
        isUpright,
      }}
    >
      <StandaloneHarpFaceContents setup={setup} isUpright={isUpright} />
    </StoreProvider>
  </GestureHandlerRootView>
)

const StandaloneHarpFaceContents = ({
  setup,
  isUpright,
}: Pick<StandaloneHarpFaceProps, 'setup'> & {
  readonly isUpright: boolean
}): ReactElement => {
  useFollowSetup(setup)
  const store = useHarpGuruStoreInstance()
  const isCellInteractive = useHarpGuruStore((state) => state.isCellInteractive)
  // The box it was given, as measured. Upright, the face is laid out in that
  // box turned a quarter, so it sizes itself to the box's height as its width.
  const [measured, setMeasured] = useState<FrameDimensions | undefined>()
  const resize = (box: FrameDimensions, isTurned: boolean) => {
    const frameDimensions = isTurned
      ? { width: box.height, height: box.width }
      : box
    store.setState((state) => ({
      isUpright: isTurned,
      frameDimensions,
      ...reduceToResizedSizes({ ...state, frameDimensions }),
    }))
  }
  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    resize({ width, height }, isUpright)
    setMeasured({ width, height })
  }

  useEffect(() => {
    if (measured !== undefined) resize(measured, isUpright)
  }, [isUpright])

  const styles = StyleSheet.create({
    fill: {
      ...StyleSheet.absoluteFill,
      backgroundColor: getColors().pageColor,
      justifyContent: 'center',
      alignItems: 'center',
      // The scale flash waits beside the face, out of sight, and an upright
      // face's unturned box is wider than the frame: both stay inside it
      overflow: 'hidden',
    },
    // The turned box: the measured box with its sides swapped, centred on it
    // and given a quarter turn about its centre
    turned:
      measured === undefined
        ? {}
        : {
          position: 'absolute',
          width: measured.height,
          height: measured.width,
          left: (measured.width - measured.height) / 2,
          top: (measured.height - measured.width) / 2,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ rotate: '90deg' }],
        },
  })

  const face = (
    <>
      <ActivityLegend />
      <HarpFaces />
    </>
  )

  return (
    <View style={styles.fill} onLayout={onLayout} testID="standalone-harp-face">
      <CallbackOnSourceGlobalProps />
      <ToggleBufferFlusher />
      {/* Nothing is drawn until the space is known, or the first frame would
          be sized to the whole window */}
      {measured !== undefined && (
        <>
          {isUpright ? <View style={styles.turned}>{face}</View> : face}
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
