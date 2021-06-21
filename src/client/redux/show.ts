/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ShowWithEpisodesDto } from '../../server/show/show.dto';
import { api } from '../utils/api';

type ShowState = {
  isLoading: boolean;
  error?: string;
  data?: ShowWithEpisodesDto;
};

const initialState: ShowState = {
  isLoading: false,
};

export const get = createAsyncThunk<ShowWithEpisodesDto, number>(
  'show/get',
  (id) => api.show.get(id)
);

export const show = createSlice({
  name: 'show',
  initialState,
  reducers: {
    clear: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(get.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
  },
});

export const showActions = { ...show.actions, get };
