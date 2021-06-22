import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { episode } from './episode';
import { pushSubscription } from './push_subscription';
import { schedule } from './schedule';
import { search } from './search';
import { show } from './show';
import { subscription } from './subscription';
import { user } from './user';

const reducers = combineReducers({
  user: user.reducer,
  search: search.reducer,
  subscription: subscription.reducer,
  show: show.reducer,
  episode: episode.reducer,
  schedule: schedule.reducer,
  pushSubscription: pushSubscription.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
