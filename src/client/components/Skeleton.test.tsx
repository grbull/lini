/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<Skeleton className="any" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
