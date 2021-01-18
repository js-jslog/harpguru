// Why can't we just reference `__DEV__` instead of
// using this function?
// Because then I don't know how to mock it in the
// tests comparing dev and production functionality.
export const isProd = (): boolean => __DEV__ === false
