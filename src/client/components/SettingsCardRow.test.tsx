/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { SettingsCardRow } from './SettingsCardRow';

describe('SettingsCardRow Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <SettingsCardRow>More testing</SettingsCardRow>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
