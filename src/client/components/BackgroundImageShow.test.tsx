/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { BackgroundImageShow } from './BackgroundImageShow';

describe('BackgroundImageShow Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <BackgroundImageShow imageURL="/image.png">Children</BackgroundImageShow>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
