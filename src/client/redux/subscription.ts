/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  SubscriptionCreateDto,
  SubscriptionDto,
  SubscriptionRemoveDto,
  SubscriptionUpdateDto,
} from '../../server/subscription/subscription.dto';
import { api } from '../utils/api';

type SubscriptionState = {
  isLoading: boolean;
  error?: string;
  data?: SubscriptionDto[];
};

const initialState: SubscriptionState = {
  isLoading: true,
};

export const getAll = createAsyncThunk<SubscriptionDto[]>(
  'subscription/getAll',
  () => api.subscription.getAll()
);

export const create = createAsyncThunk<SubscriptionDto, SubscriptionCreateDto>(
  'subscription/create',
  (createDto) => api.subscription.create(createDto)
);

export const update = createAsyncThunk<SubscriptionDto, SubscriptionUpdateDto>(
  'subscription/update',
  (updateDto) => api.subscription.update(updateDto)
);

export const remove = createAsyncThunk<SubscriptionDto, SubscriptionRemoveDto>(
  'subscription/remove',
  (removeDto) => api.subscription.remove(removeDto)
);

export const subscription = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
    builder.addCase(getAll.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });

    builder.addCase(create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data?.push(payload);
    });
    builder.addCase(create.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });

    builder.addCase(update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data?.splice(
        state.data.findIndex((s) => s.show.id === payload.show.id),
        1
      );
      state.data?.push(payload);
    });
    builder.addCase(update.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });

    builder.addCase(remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(remove.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data?.splice(
        state.data.findIndex((s) => s.show.id === payload.show.id),
        1
      );
    });
    builder.addCase(remove.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
  },
});

export const subscriptionActions = {
  ...subscription.actions,
  getAll,
  create,
  update,
  remove,
};
