/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  SubscriptionCreateDto,
  SubscriptionDto,
  SubscriptionRemoveDto,
} from '../../server/subscription/subscription.dto';
import { api } from '../utils/api';
import { scheduleActions } from './schedule';

type SubscriptionState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data: SubscriptionDto[];
  error?: string;
};

const initialState: SubscriptionState = {
  status: 'init',
  data: [],
};

export const getAll = createAsyncThunk<SubscriptionDto[]>(
  'subscription/getAll',
  () => api.subscription.getAll()
);

export const create = createAsyncThunk<SubscriptionDto, SubscriptionCreateDto>(
  'subscription/create',
  async (createDto, thunkAPI) => {
    const subscription = await api.subscription.create(createDto);
    thunkAPI.dispatch(scheduleActions.get());
    return subscription;
  }
);

export const remove = createAsyncThunk<SubscriptionDto, SubscriptionRemoveDto>(
  'subscription/remove',
  async (removeDto, thunkAPI) => {
    const subscription = await api.subscription.remove(removeDto);
    thunkAPI.dispatch(scheduleActions.get());
    return subscription;
  }
);

export const subscription = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(getAll.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });

    builder.addCase(create.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data.push(payload);
    });
    builder.addCase(create.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });

    builder.addCase(remove.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(remove.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data.splice(
        state.data.findIndex((s) => s.show.id === payload.show.id)
      );
    });
    builder.addCase(remove.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });
  },
});

export const subscriptionActions = {
  ...subscription.actions,
  getAll,
  create,
  remove,
};
