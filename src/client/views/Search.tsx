import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { SearchInput } from '../components/SearchInput';
import { ShowGrid } from '../components/ShowGrid';
import { RootState } from '../redux/store';

export function Search(): ReactElement {
  const shows = useSelector((state: RootState) => state.search.data);
  return (
    <>
      <PageHeader title="Search" />
      <SearchInput />
      {shows && <ShowGrid shows={shows} />}
      {!shows && <p className={cn('px-2')}>No results to display.</p>}
    </>
  );
}
