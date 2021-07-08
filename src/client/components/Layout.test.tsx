/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Layout>Generic children</Layout>);

    expect(asFragment()).toMatchSnapshot();
  });
});
