/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { SettingsCardRow } from './SettingsCardRow';

function setup(): RenderResult {
  const utils = render(<SettingsCardRow>More testing</SettingsCardRow>);

  return { ...utils };
}

describe('SettingsCardRow Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
