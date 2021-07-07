/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { SettingsCard } from './SettingsCard';

function setup(): RenderResult {
  const utils = render(
    <SettingsCard title="Testing">More testing</SettingsCard>
  );

  return { ...utils };
}

describe('SettingsCard Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
