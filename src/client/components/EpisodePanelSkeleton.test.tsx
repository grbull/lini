/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';
import React from 'react';

import { EpisodePanelSkeleton } from './EpisodePanelSkeleton';

describe('EpisodePanelSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<EpisodePanelSkeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
