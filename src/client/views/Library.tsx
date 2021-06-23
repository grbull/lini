import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { ShowGrid } from '../components/ShowGrid';
import { ShowGridLoading } from '../components/ShowGridLoading';
import { RootState } from '../redux/store';

export function Library(): ReactElement {
  const subscriptions = useSelector((state: RootState) => state.subscription);
  const shows = subscriptions.data
    ?.map((subscription) => subscription.show)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (subscriptions.isLoading) {
    return (
      <>
        <PageHeader title="Library" />
        <ShowGridLoading />
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
