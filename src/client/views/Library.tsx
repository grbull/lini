import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { ShowGrid } from '../components/ShowGrid';
import { RootState } from '../redux/store';

export function Library(): ReactElement {
  const subscriptions = useSelector(
    (state: RootState) => state.subscription.data
  );
  const shows = subscriptions
    ?.map((subscription) => subscription.show)
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <PageHeader title="Library" />
      {shows && shows.length > 0 && <ShowGrid shows={shows} />}
      {shows?.length === 0 && <p>No subscribed series to display.</p>}
    </>
  );
}
