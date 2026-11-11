// Lets Node run this repo's TypeScript directly, for the build scripts. The
// packages are written for a bundler: they import files without extensions,
// and import types without `import type`. So a bare './tuning' is tried as
// './tuning.ts' and then './tuning/index.ts', and each .ts file is put through
// Babel's TypeScript preset, which knows which imports are only types.
import { registerHooks } from 'node:module'
import { fileURLToPath } from 'node:url'
import { transformSync } from '@babel/core'

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (!specifier.startsWith('.')) throw error
      for (const suffix of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
        try {
          return nextResolve(specifier + suffix, context)
        } catch {
          // try the next
        }
      }
      throw error
    }
  },
  load(url, context, nextLoad) {
    if (!/\.tsx?$/.test(url)) return nextLoad(url, context)
    const { source } = nextLoad(url, { ...context, format: 'module' })
    const filename = fileURLToPath(url)
    const { code } = transformSync(String(source), {
      filename,
      babelrc: false,
      configFile: false,
      presets: [['@babel/preset-typescript', { allExtensions: true }]],
    })
    return { format: 'module', source: code, shortCircuit: true }
  },
})
