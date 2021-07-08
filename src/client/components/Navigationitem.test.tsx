/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { NavigationItem } from './NavigationItem';

describe('NavigationItem Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <NavigationItem icon={faHome} isActive to="/">
        Test
      </NavigationItem>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
