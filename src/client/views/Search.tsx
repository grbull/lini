import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { SearchInput } from '../components/SearchInput';
import { ShowGrid } from '../components/ShowGrid';
import { ShowGridSkeleton } from '../components/ShowGridSkeleton';
import { RootState } from '../redux/store';
import { Error } from './Error';

export function Search(): ReactElement {
  const search = useSelector((state: RootState) => state.search);

  if (search.status === 'error') {
    return <Error error={search.error} />;
  }

  if (search.status === 'loading') {
    return (
      <>
        <PageHeader title="Search" />
        <SearchInput />
        <ShowGridSkeleton />
      </>
    );
  }

  if (!search.data) {
    return (
      <>
        <PageHeader title="Search" />
        <SearchInput />
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
          <p>No results to display.</p>
        </div>
      </>
    );
  }

  if (search.data.length === 0) {
    return (
      <>
        <PageHeader title="Search" />
        <SearchInput />
        <div
          className={cn(
            'absolute',
            'left-1/2',
            'top-1/2',
            'm-auto',
            'w-80',
            'h-96',
            '-ml-40',
            '-mt-48',
            'flex',
            'flex-col',
            'items-center',
            'justify-center'
          )}
        >
          <img
            alt="Frustrated illustration"
            className={cn('opacity-80', 'mb-2.5')}
            src="/frustrated.png"
            width={80}
          />
          <p>No shows match your search query.</p>
        </div>
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
