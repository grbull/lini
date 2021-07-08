/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { PageHeader } from './PageHeader';

describe('PageHeader Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<PageHeader title="Testing" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loading', () => {
    const { asFragment } = testSetup(<PageHeader isLoading title="Testing" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with a titleLink', () => {
    const { asFragment } = testSetup(
      <PageHeader title="Testing" titleLink="/" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
