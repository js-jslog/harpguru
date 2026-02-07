const { View, Text, Image, Animated, processColor } = require('react-native')

const NOOP = () => {}
const NOOP_FACTORY = () => NOOP
const ID = (t) => t

const useSharedValue = (init) => ({ value: init })
const useDerivedValue = (fn) => ({ value: fn() })
const useAnimatedStyle = (fn) => fn()
const useAnimatedProps = (fn) => fn()
const useAnimatedRef = () => ({ current: null })
const useAnimatedScrollHandler = () => NOOP
const useAnimatedGestureHandler = () => NOOP

const withTiming = (value) => value
const withSpring = (value) => value
const withDecay = (value) => value
const withDelay = (_delay, value) => value
const withSequence = (...values) => values[values.length - 1]
const withRepeat = (value) => value

const interpolate = (value, inputRange, outputRange) => {
  if (inputRange.length === 0) return 0
  if (value <= inputRange[0]) return outputRange[0]
  if (value >= inputRange[inputRange.length - 1])
    return outputRange[outputRange.length - 1]
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (value >= inputRange[i] && value <= inputRange[i + 1]) {
      const ratio =
        (value - inputRange[i]) / (inputRange[i + 1] - inputRange[i])
      return outputRange[i] + ratio * (outputRange[i + 1] - outputRange[i])
    }
  }
  return outputRange[0]
}

const Extrapolation = {
  EXTEND: 'extend',
  CLAMP: 'clamp',
  IDENTITY: 'identity',
}

const createAnimatedComponent = (Component) => Component

module.exports = {
  __esModule: true,
  default: {
    View,
    Text,
    Image,
    ScrollView: Animated.ScrollView || View,
    FlatList: View,
    createAnimatedComponent,
  },
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Extrapolation,
  createAnimatedComponent,
  useEvent: (handler) => ({
    current: handler,
    workletEventHandler: { current: { registerForEvents: NOOP, unregisterFromEvents: NOOP } },
  }),
  useHandler: (handlers) => ({ context: {}, doDependenciesDiffer: false, useWeb: false }),
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  makeMutable: useSharedValue,
  cancelAnimation: NOOP,
  Easing: {
    linear: ID,
    ease: ID,
    quad: ID,
    cubic: ID,
    poly: ID,
    sin: ID,
    circle: ID,
    exp: ID,
    elastic: ID,
    back: ID,
    bounce: ID,
    bezier: () => ID,
    in: ID,
    out: ID,
    inOut: ID,
  },
  ReduceMotion: {
    System: 'system',
    Always: 'always',
    Never: 'never',
  },
  ColorSpace: {
    RGB: 0,
    HSV: 1,
  },
  SensorType: {
    ACCELEROMETER: 1,
    GYROSCOPE: 2,
    GRAVITY: 3,
    MAGNETIC_FIELD: 4,
    ROTATION: 5,
  },
  KeyboardState: {
    UNKNOWN: 0,
    OPENING: 1,
    OPEN: 2,
    CLOSING: 3,
    CLOSED: 4,
  },
  InterfaceOrientation: {
    PORTRAIT: 0,
    PORTRAIT_UPSIDE_DOWN: 1,
    LANDSCAPE_LEFT: 2,
    LANDSCAPE_RIGHT: 3,
  },
  IOSReferenceFrame: {
    XArbitraryCorrectedZVertical: 0,
    XArbitraryZVertical: 1,
    XMagneticNorthZVertical: 2,
    XTrueNorthZVertical: 3,
  },
  processColor: processColor || ID,
  interpolateColor: () => '',
  useInterpolateConfig: NOOP,
  useAnimatedReaction: NOOP,
  EntryExitTransition: View,
  FadeIn: { duration: NOOP_FACTORY },
  FadeInDown: { duration: NOOP_FACTORY },
  FadeInLeft: { duration: NOOP_FACTORY },
  FadeInRight: { duration: NOOP_FACTORY },
  FadeInUp: { duration: NOOP_FACTORY },
  FadeOut: { duration: NOOP_FACTORY },
  FadeOutDown: { duration: NOOP_FACTORY },
  FadeOutLeft: { duration: NOOP_FACTORY },
  FadeOutRight: { duration: NOOP_FACTORY },
  FadeOutUp: { duration: NOOP_FACTORY },
  Layout: { duration: NOOP_FACTORY },
  SlideInDown: { duration: NOOP_FACTORY },
  SlideInLeft: { duration: NOOP_FACTORY },
  SlideInRight: { duration: NOOP_FACTORY },
  SlideInUp: { duration: NOOP_FACTORY },
  SlideOutDown: { duration: NOOP_FACTORY },
  SlideOutLeft: { duration: NOOP_FACTORY },
  SlideOutRight: { duration: NOOP_FACTORY },
  SlideOutUp: { duration: NOOP_FACTORY },
  ZoomIn: { duration: NOOP_FACTORY },
  ZoomOut: { duration: NOOP_FACTORY },
  measure: () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  }),
  scrollTo: NOOP,
  setGestureState: NOOP,
  getRelativeCoords: () => ({ x: 0, y: 0 }),
  setUpTests: NOOP,
  getAnimatedStyle: NOOP,
  advanceAnimationByFrame: NOOP,
  advanceAnimationByTime: NOOP,
  withReanimatedTimer: NOOP,
}
