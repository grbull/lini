/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { EpisodeInfoSkeleton } from './EpisodeInfoSkeleton';

describe('EpisodeInfoSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<EpisodeInfoSkeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
