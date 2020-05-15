/**
 * @format
 */

import 'react-native';
import React from 'react';
import {HarpFace} from './index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('A component is rendered', () => {
  renderer.create(<HarpFace />);
});
