/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Error } from './Error';

describe('Error View', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Error />);

    expect(asFragment()).toMatchSnapshot();
  });
});
