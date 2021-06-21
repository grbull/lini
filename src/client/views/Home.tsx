import cn from 'classnames';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollableEpisodePanel } from '../components/ScrollableEpisodePanel';
import { SettingsButton } from '../components/SettingsButton';
import { scheduleActions } from '../redux/schedule';
import { RootState } from '../redux/store';

export function Home(): ReactElement {
  const dispatch = useDispatch();
  const { status, future, past, error } = useSelector(
    (state: RootState) => state.schedule
  );

  useEffect(() => {
    dispatch(scheduleActions.get());
  }, [dispatch]);

  return (
    <div>
      <SettingsButton />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Airing Next</h2>
      <ScrollableEpisodePanel episodes={future} />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Aired Recently</h2>
      <ScrollableEpisodePanel episodes={past} />
    </div>
  );
}
