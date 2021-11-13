// TODO: This could use a test file
export const isMatchHighOrderTuples = <T>(
  isMatchFunction: (arg0: T, arg1: T) => boolean,
  tuple1: readonly [T, T],
  tuple2: readonly [T, T]
): boolean => {
  const [tuple1_1, tuple1_2] = tuple1
  const [tuple2_1, tuple2_2] = tuple2
  return (
    isMatchFunction(tuple1_1, tuple2_1) && isMatchFunction(tuple1_2, tuple2_2)
  )
}
