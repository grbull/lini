/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { SettingsCard } from './SettingsCard';

describe('SettingsCard Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <SettingsCard title="Testing">More testing</SettingsCard>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
