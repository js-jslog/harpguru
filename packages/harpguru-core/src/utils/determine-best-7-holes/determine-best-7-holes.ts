export const determineBest7Holes = (
  harpLength: number,
  inputColumnBounds: readonly [number, number]
): readonly [number, number] => {
  const [startColumn, endColumn] = inputColumnBounds
  if (endColumn < harpLength) return inputColumnBounds
  if (endColumn === harpLength) {
    return [startColumn - 1, endColumn - 1]
  }
  throw Error('temporary error')
}
