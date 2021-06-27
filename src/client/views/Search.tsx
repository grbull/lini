import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../components/ErrorMessage';
import { PageHeader } from '../components/PageHeader';
import { SearchInput } from '../components/SearchInput';
import { ShowGrid } from '../components/ShowGrid';
import { ShowGridSkeleton } from '../components/ShowGridSkeleton';
import { RootState } from '../redux/store';

export function Search(): ReactElement {
  const search = useSelector((state: RootState) => state.search);

  if (search.status === 'error') {
    return (
      <>
        <PageHeader title="Error" />
        <ErrorMessage>{search.error}</ErrorMessage>
      </>
    );
  }

  if (search.status === 'loading') {
    return (
      <>
        <PageHeader title="Library" />
        <SearchInput />
        <ShowGridSkeleton />
      </>
    );
  }

  if (!search.data) {
    return (
      <>
        <PageHeader title="Library" />
        <SearchInput />
        <p className={cn('px-2.5')}>No results to display.</p>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Search" />
      <SearchInput />
      <ShowGrid shows={search.data} />
    </>
  );
}
