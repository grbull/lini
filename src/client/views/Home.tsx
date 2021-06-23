import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { EpisodePanel } from '../components/EpisodePanel';
import { EpisodePanelLoading } from '../components/EpisodePanelLoading';
import { SettingsButton } from '../components/SettingsButton';
import { RootState } from '../redux/store';

export function Home(): ReactElement {
  const { status, future, past, error } = useSelector(
    (state: RootState) => state.schedule
  );

  if (status === 'init') {
    return (
      <>
        <SettingsButton />
        <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Airing Next</h2>
        <EpisodePanelLoading />
        <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Aired Recently</h2>
        <EpisodePanelLoading />
      </>
    );
  }

  return (
    <>
      <SettingsButton />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Airing Next</h2>
      <EpisodePanel episodes={future} />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Aired Recently</h2>
      <EpisodePanel episodes={past} />
    </>
  );
}
