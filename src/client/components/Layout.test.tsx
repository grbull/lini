/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { reducers } from '../redux/store';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('matches the snapshot', () => {
    const history = createMemoryHistory();

    const store = configureStore({ reducer: reducers });

    window.scrollTo = jest.fn();

    const { asFragment } = render(
      <Router history={history}>
        <Provider store={store}>
          <Layout>Generic children</Layout>
        </Provider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
