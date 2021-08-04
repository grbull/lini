/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Route } from 'react-router-dom';

import { SuccessMessage } from '../components/SuccessMessage';
import { RootState } from '../redux/store';
import { api } from '../utils/api';
import { testSetup } from '../utils/testSetup';
import { Login } from './Login';

describe('Login View', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Login />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when logged in', () => {
    const initialState: Partial<RootState> = {
      user: {
        status: 'idle',
        isLoggedIn: true,
        data: {
          email: 'test@email.com',
          theme: 'auto',
          notifications: false,
          dateCreated: '',
          dateModified: '',
        },
      },
    };

    const { asFragment } = testSetup(
      <>
        <Route component={Login} />
        <Route component={SuccessMessage} exact path="/" />
      </>,
      { state: initialState }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when api call is success', async () => {
    const mockedFetch = jest
      .spyOn(api.user, 'login')
      .mockImplementationOnce(() => Promise.resolve());

    const { asFragment, getByLabelText, getByText } = testSetup(<Login />);
    const input = getByLabelText('email-input') as HTMLInputElement;
    const button = getByText('Request Link') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    await waitFor(() => expect(mockedFetch).toBeCalled());

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when api call is error', async () => {
    const mockedFetch = jest
      .spyOn(api.user, 'login')
      .mockImplementationOnce(() => Promise.reject());

    const { asFragment, getByLabelText, getByText } = testSetup(<Login />);
    const input = getByLabelText('email-input') as HTMLInputElement;
    const button = getByText('Request Link') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    await waitFor(() => expect(mockedFetch).toBeCalled());

    expect(asFragment()).toMatchSnapshot();
  });
});
