/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { InfoCard } from './InfoCard';

describe('InfoCard Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<InfoCard>Generic children</InfoCard>);
    expect(asFragment()).toMatchSnapshot();
  });
});
