/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { SettingsButton } from './SettingsButton';

function setup(): RenderResult {
  const history = createMemoryHistory();

  const utils = render(
    <Router history={history}>
      <SettingsButton />
    </Router>
  );

  return { ...utils };
}

describe('SettingsButton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
