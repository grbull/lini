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
  return (
    <>
      <PageHeader title="Library" />
      {shows && shows.length > 0 && <ShowGrid shows={shows} />}
      {shows?.length === 0 && <p>No subscribed series to display.</p>}
    </>
  );
}
