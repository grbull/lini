/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { BackgroundImageShow } from './BackgroundImageShow';

describe('BackgroundImageShow Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <BackgroundImageShow>Children</BackgroundImageShow>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
