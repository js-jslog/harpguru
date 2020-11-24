export const reverseFromOrigin = <T>(
  arrayIn: ReadonlyArray<T>
): ReadonlyArray<T> => {
  const [origin, ...arrayWithoutOrigin] = arrayIn
  const reverseWithoutOrigin = [...arrayWithoutOrigin].reverse()

  return [origin, ...reverseWithoutOrigin]
}
