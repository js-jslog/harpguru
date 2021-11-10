import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { ZoomSlideLabels } from '../zoom-slide-labels'
import { getColors } from '../../utils'
import { useIsZoomedColumnBounds, useSizes } from '../../hooks'

import { getGestureHandlerCallbacks } from './utils'
import { useSlideState, useStyles } from './hooks'

/*
 * TESTING
 * I have not been able to set up decent automated testing of this component.
 * I suggest that the following manual testing is performed if you make *any*
 * changes to this component. It's more complex than it might seem.
 *
 * 1setup. Set 10 hole harp and 7 hole zoom
 * 1test1. Slide is at top of track with 1 & 7 labels
 *
 * 2setup. Slide up and down
 * 2test1. Ensure slide cannot pass above or below page folds
 * 2test2. Ensure label numbers update during slide as expected
 * 2test3. Ensure that slide snaps to appropriate track index but doesn't jank on the way
 *
 * 3setup. Slide to middle, set a 16 hole harp
 * 3test1. Ensure that slide head moves up to appropraite new position for it's start track bound index
 * 3test2. Ensure that the slide shrinks in size
 * 3test3. Ensure that the label numbers haven't changed
 *
 * 4setup. Slide to end, set a 12 hole harp
 * 4test1. Ensure that label numbers change to the shifted columnBounds
 * 4test2. Ensure that the slide rerenders in to a new end position and isn't passing over the page fold
 *
 * 5setup. Set 7 hole harp
 * 5test1. Ensure that slide is made invisible and harpface resizes to occupy more space
 */

export const ZoomSlideVertical = (): React.ReactElement => {
  const isZoomedColumBounds = useIsZoomedColumnBounds()
  if (isZoomedColumBounds === false) return <></>

  return <ZoomSlideVerticalVisible columnBounds={isZoomedColumBounds} />
}

const ZoomSlideVerticalVisible = ({
  columnBounds,
}: {
  columnBounds: readonly [number, number]
}): React.ReactElement => {
  const [fullInteractionMatrix] = useGlobal('activeInteractionMatrix')
  const {
    [0]: { length: columnCount },
  } = fullInteractionMatrix

  const {
    trackBounds,
    setTrackBounds,
    labelStateSetterRef,
    slideOffsetAnimation,
  } = useSlideState(columnBounds, columnCount)

  const [, setSourceColumnBounds] = useGlobal('sourceColumnBounds')
  const { onGesture, onStateChange } = getGestureHandlerCallbacks(
    trackBounds,
    columnCount,
    slideOffsetAnimation,
    labelStateSetterRef.current,
    setTrackBounds,
    setSourceColumnBounds
  )

  const {
    componentWrapper,
    pointerLayer,
    topPointer,
    bottomPointer,
    labelLayer,
  } = useStyles(trackBounds, columnCount)
  const { dynamicSizes } = useSizes()
  const { inertOutline } = getColors()

  return (
    <PanGestureHandler
      onGestureEvent={onGesture}
      onHandlerStateChange={onStateChange}
    >
      <Animated.View
        style={[
          componentWrapper,
          { transform: [{ translateY: slideOffsetAnimation }] },
        ]}
      >
        <View style={pointerLayer}>
          <View style={topPointer}>
            <AntDesign
              name="up"
              size={dynamicSizes['8']}
              color={inertOutline}
            />
          </View>
          <View style={bottomPointer}>
            <AntDesign
              name="down"
              size={dynamicSizes['8']}
              color={inertOutline}
            />
          </View>
        </View>
        <View style={labelLayer}>
          <ZoomSlideLabels stateSetterRef={labelStateSetterRef} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}
