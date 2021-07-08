/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Footer />);

    expect(asFragment()).toMatchSnapshot();
  });
});
