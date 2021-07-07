/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { SuccessMessage } from './SuccessMessage';

function setup(withIllustration = false): RenderResult {
  const utils = render(
    <SuccessMessage illustration={withIllustration}>
      Generic children
    </SuccessMessage>
  );

  return { ...utils };
}

describe('SuccessMessage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with illustration', () => {
    const { asFragment } = setup(true);
    expect(asFragment()).toMatchSnapshot();
  });
});
