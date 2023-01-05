import {
  withTiming,
  Easing,
  interpolate,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

import { useScaledMenuLabelProtrusion } from '../use-scaled-menu-label-protrusion'
import { getColors } from '../../utils'
import { MenuStashPosition } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import {
  menuStashedScale,
  menuScaleTranslationFactor,
  menuStashedYOffsetFactor,
  overlayOpacity,
} from '../../constants'

type MenuAnimationValues = {
  readonly slideX: SharedValue<number>
  readonly slideY: SharedValue<number>
  readonly scale: SharedValue<number>
  readonly opacity: SharedValue<number>
  readonly backgroundColor: SharedValue<string>
  readonly labelCounterScale: SharedValue<number>
}

export const useMenuAnimationValues = (
  isMenuStashed: boolean,
  isLabelHidden: boolean,
  stashPosition: MenuStashPosition
): MenuAnimationValues => {
  const colors = getColors()
  const RIGHT = 1
  const UP1 = -3
  const UP2 = -2
  const UP3 = -1
  const MIDDLE = 0
  const DOWN1 = 1
  const DOWN2 = 2
  const DOWN3 = 3
  const stashXDirection = RIGHT
  const stashMap: Record<
    MenuStashPosition,
    | typeof UP1
    | typeof UP2
    | typeof UP3
    | typeof MIDDLE
    | typeof DOWN1
    | typeof DOWN2
    | typeof DOWN3
  > = {
    [MenuStashPosition.First]: UP1,
    [MenuStashPosition.Second]: UP2,
    [MenuStashPosition.Third]: UP3,
    [MenuStashPosition.Fourth]: MIDDLE,
    [MenuStashPosition.Fifth]: DOWN1,
    [MenuStashPosition.Sixth]: DOWN2,
    [MenuStashPosition.Seventh]: DOWN3,
  }
  const { [stashPosition]: stashYDirection } = stashMap

  const { shortEdge, longEdge } = getWindowDimensions()
  const animationDuration = 300
  const stashMenuTiming = useDerivedValue(() => {
    return withTiming(isMenuStashed ? 1 : 0, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    })
  })

  const hideLabelTiming = useDerivedValue(() => {
    return withTiming(isLabelHidden ? 1 : 0, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    })
  })
  const hideLabelVector = useScaledMenuLabelProtrusion() * stashXDirection

  const slideX = useDerivedValue(() => {
    const scaledFullX = longEdge * menuScaleTranslationFactor
    const stashedX = longEdge - scaledFullX
    const stashXVector = stashedX * stashXDirection
    const stashXValue = interpolate(
      stashMenuTiming.value,
      [0, 1],
      [0, stashXVector]
    )
    const hideXValue = interpolate(
      hideLabelTiming.value,
      [0, 1],
      [0, hideLabelVector]
    )
    return stashXValue + hideXValue
  })

  const slideY = useDerivedValue(() => {
    const stashedY = shortEdge * menuStashedYOffsetFactor
    const scaledStashedY = stashedY * menuScaleTranslationFactor
    const stashedYVector = scaledStashedY * stashYDirection
    const stashYValue = interpolate(
      stashMenuTiming.value,
      [0, 1],
      [0, stashedYVector]
    )
    return stashYValue
  })
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      stashMenuTiming.value,
      [0, 1],
      [colors.pageColor, colors.inertOutline]
    )
  )
  const opacity = useDerivedValue(() =>
    interpolate(stashMenuTiming.value, [0, 1], [overlayOpacity, 1])
  )

  const scale = useDerivedValue(() =>
    interpolate(stashMenuTiming.value, [0, 1], [1, menuStashedScale])
  )
  const labelCounterScale = useDerivedValue(() =>
    interpolate(scale.value, [menuStashedScale, 1], [1 / menuStashedScale, 0])
  )

  return {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
    labelCounterScale,
  }
}
