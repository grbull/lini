/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { InfoCard } from './InfoCard';

describe('InfoCard Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<InfoCard>Generic children</InfoCard>);

    expect(asFragment()).toMatchSnapshot();
  });
});
