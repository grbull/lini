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

import { Select } from './Select';

function setup(): RenderResult & {
  onChange: typeof jest.fn;
  select: HTMLSelectElement;
} {
  const onChange = jest.fn();

  const utils = render(<Select onChange={onChange} value="auto" />);

  const select = utils.getByLabelText('theme-select') as HTMLSelectElement;

  return { onChange, select, ...utils };
}

describe('Select Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles value change', async () => {
    const { onChange, select } = setup();

    fireEvent.change(select, { target: { value: 'light' } });
    fireEvent.focusOut(select);

    await waitFor(() => expect(onChange).toBeCalled());
  });
});
