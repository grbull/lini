/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { SearchInput } from './SearchInput';

describe('SearchInput Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<SearchInput />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles input change', async () => {
    const { getByLabelText } = testSetup(<SearchInput />);
    const input = getByLabelText('search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'query' } });
    fireEvent.focusOut(input);

    await waitFor(() => expect(input.value).toBe('query'));
  });
});
