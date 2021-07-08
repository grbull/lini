/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent } from '@testing-library/react';
import React from 'react';

import { testSetup } from '../utils/testSetup';
import { BackButton } from './BackButton';

describe('BackButton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = testSetup(<BackButton />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles being clicked', () => {
    const { getByRole, history } = testSetup(<BackButton />);
    const goBackSpy = jest.spyOn(history, 'goBack');

    fireEvent.click(getByRole('button'));
    expect(goBackSpy).toHaveBeenCalled();
  });
});
