import cn from 'classnames';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchActions } from '../redux/search';

export function SearchInput(): ReactElement {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  function changeHandler(e: ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (query === '') {
      dispatch(searchActions.reset());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(searchActions.query(query));
    }, 500);

    return (): void => clearTimeout(timer);
  }, [query, dispatch]);

  return (
    <div className={cn('px-2')}>
      <input
        aria-label="search-input"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className={cn(
          'w-full',
          'mb-4',
          'p-1',
          'text-xl',
          'text-center',
          'bg-gray-200 dark:bg-gray-600',
          'border',
          'border-solid',
          'border-gray-800',
          'focus:border-gray-400'
        )}
        onChange={changeHandler}
        placeholder="Search..."
        type="search"
        value={query}
      />
    </div>
  );
}
