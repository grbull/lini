/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ShowDto } from '../../server/show/show.dto';
import { api } from '../utils/api';

type SearchState = {
  isLoading: boolean;
  error?: string;
  data?: ShowDto[];
};

const initialState: SearchState = {
  isLoading: false,
};

export const query = createAsyncThunk<ShowDto[], string>(
  'search/query',
  (query) => api.show.search(query)
);

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clear: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(query.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(query.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
  },
});

export const searchActions = { ...search.actions, query };
