/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <ErrorMessage>Generic Error message</ErrorMessage>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with an illustration', () => {
    const { asFragment } = testSetup(
      <ErrorMessage illustration>Generic Error message</ErrorMessage>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
