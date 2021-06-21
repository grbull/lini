/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { api } from '../utils/api';

type EpisodeState = {
  isLoading: boolean;
  error?: string;
  data?: EpisodeDto;
};

const initialState: EpisodeState = {
  isLoading: false,
};

export const get = createAsyncThunk<EpisodeDto, number>('episode/get', (id) =>
  api.episode.get(id)
);

export const episode = createSlice({
  name: 'episode',
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

export const episodeActions = { ...episode.actions, get };
