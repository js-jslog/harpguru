// The harp face without the app, for the widget pages, with the colours the
// app draws it in. A separate entry from the package's main one, because a
// bundler that doesn't tree-shake would otherwise carry the whole app, its
// menus and their icon fonts into every page.
export { StandaloneHarpFace } from './src/components/standalone-harp-face'
export type { StandaloneHarpFaceProps } from './src/components/standalone-harp-face'
export { getColors } from './src/utils'
