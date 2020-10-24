import 'react-native'

declare module 'react-native' {
  // Disable is required here because the `any` is not in keeping with
  // our eslint config. It is however the official type definition for
  // these function defs at https://unpkg.com/@types/react-dom@16.9.8/index.d.ts
  // (adminttedly that is react-dom, but it seems to be working)
  /* eslint-disable */
  export function unstable_batchedUpdates<A, B>(
    callback: (a: A, b: B) => any,
    a: A,
    b: B
  ): void
  export function unstable_batchedUpdates<A>(
    callback: (a: A) => any,
    a: A
  ): void
  export function unstable_batchedUpdates(callback: () => any): void
  /* eslint-enable */
}
