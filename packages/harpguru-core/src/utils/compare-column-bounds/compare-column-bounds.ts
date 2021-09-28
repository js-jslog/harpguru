export const compareColumnBounds = (
  bounds1: 'FIT' | readonly [number, number],
  bounds2: 'FIT' | readonly [number, number]
): boolean => {
  return Object.is(bounds1, bounds2)
}
