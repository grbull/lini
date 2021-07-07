/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { configureStore } from '@reduxjs/toolkit';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { reducers } from '../redux/store';
import { SearchInput } from './SearchInput';

function setup(): RenderResult & { input: HTMLInputElement } {
  const store = configureStore({
    reducer: reducers,
  });

  const utils = render(
    <Provider store={store}>
      <SearchInput />
    </Provider>
  );

  const input = utils.getByLabelText('search-input') as HTMLInputElement;

  return { input, ...utils };
}

describe('SearchInput Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles input change', async () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'query' } });
    fireEvent.focusOut(input);

    await waitFor(() => expect(input.value).toBe('query'));
  });
});
