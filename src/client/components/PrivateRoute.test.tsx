/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import { reducers, RootState } from '../redux/store';
import { ErrorMessage } from './ErrorMessage';
import { Footer } from './Footer';
import { PrivateRoute } from './PrivateRoute';

function setup(state?: Partial<RootState>): RenderResult {
  const history = createMemoryHistory();
  const store = configureStore({
    reducer: reducers,
    preloadedState: state ?? undefined,
  });

  const utils = render(
    <Router history={history}>
      <Provider store={store}>
        <Route component={ErrorMessage} exact path="/login" />
        <PrivateRoute component={Footer} />
      </Provider>
    </Router>
  );

  return { ...utils };
}

describe('PrivateRoute Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup({
      user: {
        status: 'idle',
        data: {
          theme: 'auto',
          email: 'test@email.com',
          notifications: false,
          dateCreated: '',
          dateModified: '',
        },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with user error', () => {
    const { asFragment } = setup({
      user: { status: 'error', error: 'Generic Error' },
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
