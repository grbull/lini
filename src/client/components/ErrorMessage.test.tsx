/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <ErrorMessage>Generic Error message</ErrorMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with an illustration', () => {
    const { asFragment } = render(
      <ErrorMessage illustration>Generic Error message</ErrorMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
