/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { FixedImage } from './FixedImage';

describe('FixedImage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <FixedImage
        alt="image"
        fullHeight={1080}
        fullWidth={1920}
        src="/image.png"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
