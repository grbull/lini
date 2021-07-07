/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';

import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { PageHeader } from './PageHeader';

function setup({ ...props }: Record<string, unknown>): RenderResult {
  const history = createMemoryHistory();

  const utils = render(
    <Router history={history}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <PageHeader title="Testing" {...props} />
    </Router>
  );

  return { ...utils };
}

describe('PageHeader Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = setup({});
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot when loading', () => {
    const { asFragment } = setup({ isLoading: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches the snapshot with a titleLink', () => {
    const { asFragment } = setup({ titleLink: '/' });
    expect(asFragment()).toMatchSnapshot();
  });
});
