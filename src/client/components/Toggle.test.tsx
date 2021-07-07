/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';

import { Toggle } from './Toggle';

function setup(): RenderResult & {
  onChange: typeof jest.fn;
  input: HTMLInputElement;
} {
  const onChange = jest.fn();
  const utils = render(<Toggle id="test" onChange={onChange} value={false} />);

  const input = utils.getByLabelText('toggle') as HTMLInputElement;

  return { onChange, input, ...utils };
}

describe('Toggle Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be toggled', () => {
    const { onChange, input } = setup();

    fireEvent.click(input);

    expect(onChange).toBeCalled();
  });
});
