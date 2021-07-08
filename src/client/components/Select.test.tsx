/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Select } from './Select';

describe('Select Component', () => {
  // eslint-disable-next-line init-declarations
  let onChange: typeof jest.fn;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <Select onChange={onChange} value="auto" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles value change', async () => {
    const { getByLabelText } = testSetup(
      <Select onChange={onChange} value="auto" />
    );
    const select = getByLabelText('theme-select') as HTMLSelectElement;

    fireEvent.change(select, { target: { value: 'light' } });
    fireEvent.focusOut(select);

    await waitFor(() => expect(onChange).toBeCalled());
  });
});
