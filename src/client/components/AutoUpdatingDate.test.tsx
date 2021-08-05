/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { dateFromNow } from '../utils/date';
import { testSetup } from '../utils/testSetup';
import { AutoUpdatingDate } from './AutoUpdatingDate';

describe('AutoUpdatingDate Component', () => {
  beforeAll(() => {
    // For snapshot consistency we need to fake the date
    Date.now.bind(global.Date);
    global.Date.now = jest.fn(() => 1625584251217);
  });

  it('matches the snapshot', () => {
    const { asFragment } = testSetup(
      <AutoUpdatingDate date="2021-08-05T13:38:35.524Z" format={dateFromNow} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot without a date', () => {
    const { asFragment } = testSetup(
      <AutoUpdatingDate date={null} format={dateFromNow} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
