/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PushSubscriptionCreateDto } from '../../server/push_subscription/push_subscription.dto';
import { api } from '../utils/api';

type PushSubscriptionStatus = 'idle' | 'loading' | 'error';

type PushSubscriptionState = {
  status: PushSubscriptionStatus;
  error?: string;
};

const initialState: PushSubscriptionState = {
  status: 'idle',
};

export const create = createAsyncThunk<void, PushSubscriptionCreateDto>(
  'push_subscription/get',
  (createDto) => api.push.create(createDto)
);

export const pushSubscription = createSlice({
  name: 'push_subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(create.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(create.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(create.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });
  },
});

export const pushSubscriptionActions = {
  ...pushSubscription.actions,
  create,
};
