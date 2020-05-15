import 'react-native';
import React from 'react';
import {HarpCell} from './index';

import {render} from '@testing-library/react-native';

test('A component is rendered with an "A" text view', () => {
  const {getByText} = render(<HarpCell />);

  expect(getByText('A')).toBeTruthy();
});
