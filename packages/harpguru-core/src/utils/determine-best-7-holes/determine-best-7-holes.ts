export const determineBest7Holes = (
  harpLength: number,
  inputColumnBounds: readonly [number, number]
): readonly [number, number] => {
  const [, endColumn] = inputColumnBounds
  if (endColumn < harpLength + 1) return inputColumnBounds
  throw Error('temporary error')
}
