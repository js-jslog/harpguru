export const determineBest7Holes = (
  harpLength: number,
  inputColumnBounds: readonly [number, number]
): readonly [number, number] => {
  const [startColumn, endColumn] = inputColumnBounds
  if (endColumn < harpLength) return inputColumnBounds
  if (endColumn >= harpLength) {
    const difference = endColumn - harpLength + 1
    return [startColumn - difference, endColumn - difference]
  }
  throw Error('temporary error')
}
