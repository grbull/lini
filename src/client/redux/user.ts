/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthValidateDto } from '../../server/auth/auth.dto';
import { UserDto, UserUpdateDto } from '../../server/user/user.dto';
import { api } from '../utils/api';
import { scheduleActions } from './schedule';
import { RootState } from './store';
import { subscriptionActions } from './subscription';

type UserState = {
  status: 'init' | 'loading' | 'idle' | 'error';
  data?: UserDto;
  error?: string;
};

const initialState: UserState = {
  status: 'init',
};

export const get = createAsyncThunk<UserDto, void>(
  'user/get',
  async (_, thunkAPI) => {
    const user = await api.user.get();
    thunkAPI.dispatch(subscriptionActions.getAll());
    thunkAPI.dispatch(scheduleActions.get());
    return user;
  }
);

export const update = createAsyncThunk<UserDto, UserUpdateDto>(
  'user/update',
  (updateDto) => api.user.update(updateDto)
);

export const validateToken = createAsyncThunk<
  UserDto,
  AuthValidateDto,
  { state: RootState }
>('user/validate', async (validateDto, thunkAPI) => {
  const user = await api.user.validate(validateDto);
  thunkAPI.dispatch(subscriptionActions.getAll());
  return user;
});

export const user = createSlice({
  name: 'user',
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

    builder.addCase(update.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(update.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });

    builder.addCase(validateToken.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    });
    builder.addCase(validateToken.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.data = payload;
    });
    builder.addCase(validateToken.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error.message;
    });
  },
});

export const userActions = {
  ...user.actions,
  get,
  update,
  validateToken,
};
