import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../components/ErrorMessage';
import { PageHeader } from '../components/PageHeader';
import { ShowGrid } from '../components/ShowGrid';
import { ShowGridSkeleton } from '../components/ShowGridSkeleton';
import { RootState } from '../redux/store';

export function Library(): ReactElement {
  const subscriptions = useSelector((state: RootState) => state.subscription);
  const shows = subscriptions.data
    ?.map((subscription) => subscription.show)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (subscriptions.status === 'error') {
    return (
      <>
        <PageHeader title="Error" />
        <ErrorMessage>{subscriptions.error}</ErrorMessage>
      </>
    );
  }

  if (subscriptions.status === 'loading') {
    return (
      <>
        <PageHeader title="Library" />
        <ShowGridSkeleton />
      </>
    );
  }

  if (!shows || shows.length === 0) {
    return (
      <>
        <PageHeader title="Library" />
        <div
          className={cn(
            'absolute',
            'left-1/2',
            'top-1/2',
            'm-auto',
            'w-96',
            'h-48',
            '-ml-48',
            '-mt-24',
            'flex',
            'flex-col',
            'items-center',
            'justify-center'
          )}
        >
          <img
            alt="Neutral illustration"
            className={cn('opacity-80', 'mb-2.5')}
            src="/neutral.png"
            width={80}
          />
          <p>You are not yet subscribed to any shows.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Library" />
      <ShowGrid shows={shows} />
    </>
  );
}
