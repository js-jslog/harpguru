import { useState, useEffect } from 'reactn'
import { useTimingTransition } from 'react-native-redash'
import { Easing, interpolate } from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'

import type { OptionIds } from '../../../../types'
import { usePrevious } from '../../../../hooks'

export const useScaleOnUpdateAnimation = (
  id: OptionIds | undefined
): Node<number> => {
  const [shouldDoUpdateAnimation, setShouldDoUpdateAnimation] = useState(false)
  const [doUpdateAnimation, setDoUpdateAnimation] = useState(false)
  const previousId = usePrevious(id, undefined)
  const idChanged = previousId !== id

  const animationDuration = 200
  const scaleFactor = 3

  const timingValue = useTimingTransition(doUpdateAnimation, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(timingValue, {
    inputRange: [0, 1],
    outputRange: doUpdateAnimation ? [1, scaleFactor] : [1, scaleFactor],
  })

  useEffect(() => {
    if (!idChanged || shouldDoUpdateAnimation === true) return
    setShouldDoUpdateAnimation(true)
  }, [idChanged, shouldDoUpdateAnimation, setShouldDoUpdateAnimation])

  useEffect(() => {
    const timeForUpdateAnimation = setTimeout(() => {
      if (!shouldDoUpdateAnimation || doUpdateAnimation) return
      setDoUpdateAnimation(true)
      setShouldDoUpdateAnimation(false)
    }, 0)
    return () => {
      clearTimeout(timeForUpdateAnimation)
    }
  }, [
    shouldDoUpdateAnimation,
    doUpdateAnimation,
    setDoUpdateAnimation,
    setShouldDoUpdateAnimation,
  ])

  useEffect(() => {
    const afterUpdateAnimation = setTimeout(() => {
      if (!doUpdateAnimation) return
      setDoUpdateAnimation(false)
    }, animationDuration)
    return () => {
      clearTimeout(afterUpdateAnimation)
    }
  }, [doUpdateAnimation, setDoUpdateAnimation])

  return animationValue
}
