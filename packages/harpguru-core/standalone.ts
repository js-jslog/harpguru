// The harp face without the app: the composed component and the setup URL
// format, for the widget pages. A separate entry from the package's main one,
// because a bundler that doesn't tree-shake would otherwise carry the whole
// app, its menus and their icon fonts into every page.
export { StandaloneHarpFace } from './src/components/standalone-harp-face'
export type { StandaloneHarpFaceProps } from './src/components/standalone-harp-face'
export { DisplayModes } from './src/types'
export {
  siteOrigin,
  defaultSetup,
  readSetupQuery,
  writeSetupQuery,
  writeSetupUrl,
  readSetupUrl,
} from './src/setup-url'
export type { Setup } from './src/setup-url'
