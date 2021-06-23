/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  EpisodeDto,
  EpisodeScheduleDto,
} from '../../server/episode/episode.dto';
import { api } from '../utils/api';

type ScheduleStatus = 'init' | 'idle' | 'loading' | 'error';

type ScheduleState = {
  status: ScheduleStatus;
  future: EpisodeDto[];
  past: EpisodeDto[];
  error?: string;
};

const initialState: ScheduleState = {
  status: 'init',
  future: [],
  past: [],
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
    });
    builder.addCase(get.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.future = payload.future;
      state.past = payload.past;
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
