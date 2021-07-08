/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { SuccessMessage } from './SuccessMessage';

describe('SuccessMessage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <SuccessMessage>Generic children</SuccessMessage>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with illustration', () => {
    const { asFragment } = testSetup(
      <SuccessMessage illustration>Generic children</SuccessMessage>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
