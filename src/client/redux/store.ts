import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { episode } from './episode';
import { pushSubscription } from './push_subscription';
import { schedule } from './schedule';
import { search } from './search';
import { show } from './show';
import { subscription } from './subscription';
import { user } from './user';

export const reducers = combineReducers({
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
  version: 2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
