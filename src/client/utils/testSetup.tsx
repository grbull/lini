import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { reducers, RootState } from '../redux/store';

export interface TestSetupProps {
  history?: MemoryHistory;
  state?: Partial<RootState>;
}

export interface TestSetupResult extends RenderResult {
  dispatch: typeof jest.fn;
  history: MemoryHistory<unknown>;
  scrollTo: typeof jest.fn;
}

export function testSetup(
  children: ReactNode,
  props?: TestSetupProps
): TestSetupResult {
  const history = props?.history || createMemoryHistory();
  const store = configureStore({
    reducer: reducers,
    preloadedState: props?.state || undefined,
  });

  // const reduxHistory = [];
  // const dispatch = (action: any): any => reduxHistory.push(action);
  const dispatch = jest.fn();
  store.dispatch = dispatch;

  const scrollTo = jest.fn();
  window.scrollTo = scrollTo;

  const utils = render(
    <Router history={history}>
      <Provider store={store}>{children}</Provider>
    </Router>
  );

  return { dispatch, history, scrollTo, ...utils };
}
