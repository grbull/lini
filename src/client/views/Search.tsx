import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { SearchInput } from '../components/SearchInput';
import { ShowGrid } from '../components/ShowGrid';
import { ShowGridSkeleton } from '../components/ShowGridSkeleton';
import { RootState } from '../redux/store';

export function Search(): ReactElement {
  const search = useSelector((state: RootState) => state.search);

  if (search.isLoading) {
    return (
      <>
        <PageHeader title="Library" />
        <SearchInput />
        <ShowGridSkeleton />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Search" />
      <SearchInput />
      {search.data && <ShowGrid shows={search.data} />}
      {!search.data && <p className={cn('px-2')}>No results to display.</p>}
    </>
  );
}
