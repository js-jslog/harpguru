export const setIfNew = <T>(
  prev: T,
  next: T,
  setter: (arg0: T) => void
): void => {
  if (Object.is(prev, next)) return
  setter(next)
}
