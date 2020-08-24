const fs = require('fs')

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)

if (fs.existsSync('./node_modules/react-native-gesture-handler/jestSetup.js')) {
  require('./node_modules/react-native-gesture-handler/jestSetup.js')
} else if (fs.existsSync('../node_modules/react-native-gesture-handler/jestSetup.js')) {
  require('../node_modules/react-native-gesture-handler/jestSetup.js')
} else {
  throw new Error('Cannot find react-native-gesture-handler jestSetup.js')
}
