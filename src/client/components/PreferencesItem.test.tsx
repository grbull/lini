/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { PreferencesItem } from './PreferencesItem';

function setup(): RenderResult {
  const utils = render(
    <PreferencesItem description="testing" title="testing">
      Generic child
    </PreferencesItem>
  );

  return { ...utils };
}

describe('PreferencesItem Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
