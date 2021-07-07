/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { FixedImage } from './FixedImage';

describe('FixedImage Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
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
