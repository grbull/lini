/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { api } from '../utils/api';

type EpisodeState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data?: EpisodeDto;
  error?: string;
};

const initialState: EpisodeState = {
  status: 'init',
};

export const get = createAsyncThunk<EpisodeDto, number>('episode/get', (id) =>
  api.episode.get(id)
);

export const episode = createSlice({
  name: 'episode',
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

export const episodeActions = {
  ...episode.actions,
  get,
};
