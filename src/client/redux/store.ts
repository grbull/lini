import { configureStore } from '@reduxjs/toolkit';

import { episode } from './episode';
import { pushSubscription } from './push_subscription';
import { schedule } from './schedule';
import { search } from './search';
import { show } from './show';
import { subscription } from './subscription';
import { user } from './user';

export const store = configureStore({
  reducer: {
    user: user.reducer,
    search: search.reducer,
    subscription: subscription.reducer,
    show: show.reducer,
    episode: episode.reducer,
    schedule: schedule.reducer,
    pushSubscription: pushSubscription.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
