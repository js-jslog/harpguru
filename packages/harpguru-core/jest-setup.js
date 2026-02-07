// react-native-reanimated is mocked via __mocks__/react-native-reanimated.js

require('../../node_modules/react-native-gesture-handler/jestSetup.js')

// Suppress act() warnings triggered by @testing-library/react-native cleanup.
// These occur when components with store subscriptions are unmounted during
// automatic afterEach cleanup and are not indicative of real issues.
const originalConsoleError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('was not wrapped in act')
  ) {
    return
  }
  originalConsoleError.call(console, ...args)
}
