import 'react-native';
import React from 'react';
import {HarpCell} from './index';

import renderer from 'react-test-renderer';

test('A component is rendered', () => {
  renderer.create(<HarpCell />);
});
