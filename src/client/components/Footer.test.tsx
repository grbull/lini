/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { Footer } from './Footer';

describe('Footer Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
