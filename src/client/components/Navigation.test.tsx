/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { reducers, RootState } from '../redux/store';
import { Navigation } from './Navigation';

function setup(state?: Partial<RootState>): RenderResult {
  const history = createMemoryHistory();
  const store = configureStore({
    reducer: reducers,
    preloadedState: state ?? undefined,
  });

  window.scrollTo = jest.fn();

  const utils = render(
    <Router history={history}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Router>
  );

  return { ...utils };
}

describe('Navigation Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with user error', () => {
    const { asFragment } = setup({
      user: { status: 'error', error: 'Generic Error' },
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
