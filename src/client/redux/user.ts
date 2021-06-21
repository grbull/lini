/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthValidateDto } from '../../server/auth/auth.dto';
import { UserDto, UserUpdateDto } from '../../server/user/user.dto';
import { api } from '../utils/api';
import { RootState } from './store';
import { subscriptionActions } from './subscription';

type UserState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  profile?: UserDto;
  error?: string;
};

// should isLoading be false?
const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
};

export const get = createAsyncThunk<UserDto, void>(
  'user/get',
  async (_, thunkAPI) => {
    const user = await api.user.get();
    thunkAPI.dispatch(subscriptionActions.getAll());
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
    builder.addCase(get.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.profile = payload;
    });
    builder.addCase(get.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.profile = payload;
    });
    builder.addCase(update.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
    builder.addCase(validateToken.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.profile = payload;
    });
    builder.addCase(validateToken.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
  },
});

export const userActions = { ...user.actions, get, update, validateToken };
