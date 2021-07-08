/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { Route } from 'react-router-dom';

import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { ErrorMessage } from './ErrorMessage';
import { Footer } from './Footer';
import { PrivateRoute } from './PrivateRoute';

describe('PrivateRoute Component', () => {
  it('matches the snapshot', () => {
    const initialState: Partial<RootState> = {
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
    };

    const { asFragment } = testSetup(
      <>
        <Route component={ErrorMessage} exact path="/login" />
        <PrivateRoute component={Footer} />
      </>,
      { state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with user error', () => {
    const initialState: Partial<RootState> = {
      user: {
        status: 'error',
        error: 'Generic Error',
      },
    };

    const { asFragment } = testSetup(
      <>
        <Route component={ErrorMessage} exact path="/login" />
        <PrivateRoute component={Footer} />
      </>,
      { state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
