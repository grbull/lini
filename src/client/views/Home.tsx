import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { EpisodePanel } from '../components/EpisodePanel';
import { EpisodePanelSkeleton } from '../components/EpisodePanelSkeleton';
import { SettingsButton } from '../components/SettingsButton';
import { RootState } from '../redux/store';
import { Error } from './Error';

export function Home(): ReactElement {
  const schedule = useSelector((state: RootState) => state.schedule);

  if (schedule.status === 'error') {
    return (
      <>
        <Helmet>
          <title>Home - Lini</title>
        </Helmet>
        <Error error={schedule.error} />
      </>
    );
  }

  if (schedule.status === 'init') {
    return (
      <>
        <Helmet>
          <title>Home - Lini</title>
        </Helmet>
        <SettingsButton />
        <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Airing Next</h2>
        <EpisodePanelSkeleton />
        <h2 className={cn('ml-2', 'text-xl', 'font-bold', 'md:mt-8')}>
          Aired Recently
        </h2>
        <EpisodePanelSkeleton />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home - Lini</title>
      </Helmet>
      <SettingsButton />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold')}>Airing Next</h2>
      <EpisodePanel episodes={schedule.data.future} />
      <h2 className={cn('ml-2', 'text-xl', 'font-bold', 'md:mt-8')}>
        Aired Recently
      </h2>
      <EpisodePanel episodes={schedule.data.past} />
    </>
  );
}
