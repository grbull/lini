/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { LoginForm } from './LoginForm';

describe('LoginForm Component', () => {
  // eslint-disable-next-line init-declarations
  let onSubmit: typeof jest.fn;

  beforeEach(() => {
    onSubmit = jest.fn();
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<LoginForm onSubmit={onSubmit} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles input', () => {
    const { getByLabelText } = testSetup(<LoginForm onSubmit={onSubmit} />);
    const input = getByLabelText('email-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    expect(input.value).toBe('test@email.com');
  });

  it('handles correct values', async () => {
    const { getByLabelText, getByText } = testSetup(
      <LoginForm onSubmit={onSubmit} />
    );
    const input = getByLabelText('email-input') as HTMLInputElement;
    const button = getByText('Request Link') as HTMLButtonElement;

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('handles incorrect values', async () => {
    const { getByLabelText, getByText } = testSetup(
      <LoginForm onSubmit={onSubmit} />
    );
    const input = getByLabelText('email-input') as HTMLInputElement;
    const button = getByText('Request Link') as HTMLButtonElement;

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'testemail.com' } });
    await waitFor(() => expect(input.value).toBe('testemail.com'));

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
