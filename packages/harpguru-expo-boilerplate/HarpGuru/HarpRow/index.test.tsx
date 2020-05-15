import 'react-native';
import React from 'react';
import {HarpRow} from './index';

import renderer from 'react-test-renderer';

test('A component is rendered', () => {
  renderer.create(<HarpRow />);
});
