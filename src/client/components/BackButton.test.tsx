/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { BackButton } from './BackButton';

describe('BackButton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<BackButton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles being clicked', () => {
    const history = createMemoryHistory();
    const goBackSpy = jest.spyOn(history, 'goBack');
    const { getByRole } = render(
      <Router history={history}>
        <BackButton />
      </Router>
    );
    fireEvent.click(getByRole('button'));
    expect(goBackSpy).toHaveBeenCalled();
  });
});
