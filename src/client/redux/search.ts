/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ShowDto } from '../../server/show/show.dto';
import { api } from '../utils/api';

type SearchState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data?: ShowDto[];
  error?: string;
};

const initialState: SearchState = {
  status: 'init',
};

export const query = createAsyncThunk<ShowDto[], string>(
  'search/query',
  (query) => api.show.search(query)
);

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(query.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });
  },
});

export const searchActions = {
  ...search.actions,
  query,
};
