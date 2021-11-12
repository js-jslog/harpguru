type WithSnapProps = {
  readonly withSnapOffset: number
  readonly withSnapIndex: number
}

export const getWithSnapProps = (
  slideOffset: number,
  trackLength: number,
  maxTrackIndex: number
): WithSnapProps => {
  const slotLength = trackLength / maxTrackIndex
  const withSnapIndex = Math.round(slideOffset / slotLength)
  const withSnapOffset = withSnapIndex * slotLength

  return {
    withSnapOffset,
    withSnapIndex,
  }
}
