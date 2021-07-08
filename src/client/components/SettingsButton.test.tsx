/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { SettingsButton } from './SettingsButton';

describe('SettingsButton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<SettingsButton />);

    expect(asFragment()).toMatchSnapshot();
  });
});
