/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { testSetup } from '../utils/testSetup';
import { PreferencesItem } from './PreferencesItem';

describe('PreferencesItem Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <PreferencesItem description="testing" title="testing">
        Generic child
      </PreferencesItem>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
