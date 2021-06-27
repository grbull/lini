/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ShowWithEpisodesDto } from '../../server/show/show.dto';
import { api } from '../utils/api';

type ShowState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data?: ShowWithEpisodesDto;
  error?: string;
};

const initialState: ShowState = {
  status: 'init',
};

export const get = createAsyncThunk<ShowWithEpisodesDto, number>(
  'show/get',
  (id) => api.show.get(id)
);

export const show = createSlice({
  name: 'show',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.status = 'loading';
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(get.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(get.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });
  },
});

export const showActions = {
  ...show.actions,
  get,
};
