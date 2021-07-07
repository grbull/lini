/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import React from 'react';

import { LoginForm } from './LoginForm';

function setup(): RenderResult & {
  onSubmit: typeof jest.fn;
  input: HTMLInputElement;
  button: HTMLButtonElement;
} {
  const onSubmit = jest.fn();
  const utils = render(<LoginForm onSubmit={onSubmit} />);
  const input = utils.getByLabelText('email-input') as HTMLInputElement;
  const button = utils.getByText('Request Link') as HTMLButtonElement;
  return {
    onSubmit,
    input,
    button,
    ...utils,
  };
}

describe('LoginForm Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles input', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    expect(input.value).toBe('test@email.com');
  });

  it('handles correct values', async () => {
    const { onSubmit, button, input } = setup();

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'test@email.com' } });

    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('handles incorrect values', async () => {
    const { onSubmit, button, input } = setup();

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'testemail.com' } });
    await waitFor(() => expect(input.value).toBe('testemail.com'));

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
