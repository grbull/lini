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
      <BackgroundImageShow imageURL="/image.png">Children</BackgroundImageShow>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
