/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { NavigationItem } from './NavigationItem';

function setup(): RenderResult {
  const history = createMemoryHistory();

  const utils = render(
    <Router history={history}>
      <NavigationItem icon={faHome} isActive to="/">
        Test
      </NavigationItem>
    </Router>
  );

  return { ...utils };
}

describe('NavigationItem Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
