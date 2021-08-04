/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import routeData from 'react-router';
import { Route } from 'react-router-dom';

import { ErrorMessage } from '../components/ErrorMessage';
import { SuccessMessage } from '../components/SuccessMessage';
import { RootState } from '../redux/store';
import { testSetup } from '../utils/testSetup';
import { Validate } from './Validate';

describe('Validate View', () => {
  const useLocation = jest.spyOn(routeData, 'useLocation');

  beforeEach(() => {
    useLocation.mockReturnValue({ search: 'token=randomtoken' } as never);
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Validate />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when error', () => {
    const initialState: Partial<RootState> = {
      user: { status: 'error', isLoggedIn: false, error: 'Generic error' },
    };

    const { asFragment } = testSetup(<Validate />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loading', () => {
    const initialState: Partial<RootState> = {
      user: { status: 'loading', isLoggedIn: false },
    };

    const { asFragment } = testSetup(<Validate />, { state: initialState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when user is logged in', () => {
    const initialState: Partial<RootState> = {
      user: {
        status: 'idle',
        isLoggedIn: true,
        data: {
          email: 'test@email.com',
          theme: 'auto',
          notifications: true,
          dateCreated: '2021-07-08T13:59:33.937Z',
          dateModified: '2021-07-08T13:59:33.937Z',
        },
      },
    };

    const { asFragment } = testSetup(
      <>
        <Route component={Validate} />
        <Route component={SuccessMessage} exact path="/" />
      </>,
      { state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when there is no token', () => {
    useLocation.mockReturnValue({ search: '' } as never);

    const { asFragment } = testSetup(
      <>
        <Route component={Validate} />
        <Route component={ErrorMessage} exact path="/login" />
      </>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger dispatch with token and user error', () => {
    const initialState: Partial<RootState> = {
      user: { status: 'error', isLoggedIn: false, error: 'Generic error' },
    };

    const { dispatch } = testSetup(<Validate />, { state: initialState });

    expect(dispatch).toBeCalled();
  });
});
