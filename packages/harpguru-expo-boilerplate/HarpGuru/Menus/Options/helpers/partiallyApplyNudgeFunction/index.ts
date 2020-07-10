export const partiallyApplyNudgeFunction = <K extends Record<string, unknown>>(
  nudgeFunction: (arg0: K, arg1: 'UP' | 'DOWN') => void,
  partialParams: K
): ((arg0: 'UP' | 'DOWN') => void) => {
  return (direction: 'UP' | 'DOWN'): void => {
    nudgeFunction(partialParams, direction)
  }
}
