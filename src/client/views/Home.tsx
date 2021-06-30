import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { EpisodePanel } from '../components/EpisodePanel';
import { EpisodePanelSkeleton } from '../components/EpisodePanelSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';
import { PageHeader } from '../components/PageHeader';
import { SettingsButton } from '../components/SettingsButton';
import { RootState } from '../redux/store';

export function Home(): ReactElement {
  const schedule = useSelector((state: RootState) => state.schedule);

  if (schedule.status === 'error') {
    return (
      <>
        <PageHeader title="Error" />
        <ErrorMessage>{schedule.error}</ErrorMessage>
      </>
    );
  }

  if (schedule.status === 'init') {
    return (
      <>
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
