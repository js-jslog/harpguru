require('react-native-reanimated/lib/module/reanimated2/jestUtils.js').setUpTests()

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)

require('../../node_modules/react-native-gesture-handler/jestSetup.js')
