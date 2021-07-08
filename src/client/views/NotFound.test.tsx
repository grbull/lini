/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { NotFound } from './NotFound';

describe('NotFound View', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<NotFound />);

    expect(asFragment()).toMatchSnapshot();
  });
});
