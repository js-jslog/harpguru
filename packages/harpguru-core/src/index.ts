// Import type definitions to index.ts so that
// dependants benefit from them too.
// These imports aren't required for this project
// since `global` and `typings` are referenced
// automatically in a local context. When this
// project is imported, these types are otherwise
// ignored which is a problem.
import './global'
import '../typings/polyfills.d'

export { HarpGuru } from './components'
