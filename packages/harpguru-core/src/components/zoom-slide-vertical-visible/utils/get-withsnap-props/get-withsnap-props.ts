type WithSnapProps = {
  readonly withSnapOffset: number
  readonly withSnapIndex: number
}

export const getWithSnapProps = (
  slideOffset: number,
  trackLength: number,
  slotCount: number
): WithSnapProps => {
  const slotLength = trackLength / slotCount
  const withSnapIndex = Math.round(slideOffset / slotLength)
  const withSnapOffset = withSnapIndex * slotLength

  return {
    withSnapOffset,
    withSnapIndex,
  }
}
