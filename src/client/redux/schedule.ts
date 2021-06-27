/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  EpisodeDto,
  EpisodeScheduleDto,
} from '../../server/episode/episode.dto';
import { api } from '../utils/api';

type ScheduleState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data: {
    future: EpisodeDto[];
    past: EpisodeDto[];
  };
  error?: string;
};

const initialState: ScheduleState = {
  status: 'init',
  data: {
    future: [],
    past: [],
  },
};

export const get = createAsyncThunk<EpisodeScheduleDto>('schedule/get', () =>
  api.episode.getSchedule()
);

export const schedule = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.status = 'loading';
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

export const scheduleActions = {
  ...schedule.actions,
  get,
};
