/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent } from '@testing-library/react';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  // eslint-disable-next-line init-declarations
  let onChange: typeof jest.fn;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <Toggle id="test" onChange={onChange} value={false} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be toggled', () => {
    const { getByLabelText } = testSetup(
      <Toggle id="test" onChange={onChange} value={false} />
    );
    const input = getByLabelText('toggle') as HTMLInputElement;

    fireEvent.click(input);

    expect(onChange).toBeCalled();
  });
});
