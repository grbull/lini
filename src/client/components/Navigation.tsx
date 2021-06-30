import {
  faFolderOpen,
  faHome,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { RootState } from '../redux/store';
import { NavigationItem } from './NavigationItem';

export function Navigation(): ReactElement {
  const user = useSelector((state: RootState) => state.user);
  const { pathname } = useLocation();

  // Only show navigation when user is logged in
  if (user.error) {
    return <div />;
  }
  // When navigating to new page, scrolls to top
  window.scrollTo(0, 0);

  return (
    <nav
      className={cn(
        'h-14',
        'fixed',
        'bottom-0 md:top-0',
        'w-full',
        'bg-gray-200 dark:bg-gray-800'
      )}
    >
      <div
        className={cn(
          'h-14',
          'w-full',
          'md:max-w-4xl',
          'mx-0 md:mx-auto',
          'md:flex',
          'md:justify-between',
          'md:items-center',
          'md:px-2.5'
        )}
      >
        <a
          className={cn('hidden', 'md:block', 'font-semibold', 'text-2xl')}
          href="/"
        >
          Lini
        </a>
        <div className={cn('h-full', 'flex', 'justify-around', 'items-center')}>
          <NavigationItem
            icon={faHome}
            isActive={!!['/', '/settings'].find((path) => path === pathname)}
            to="/"
          >
            Home
          </NavigationItem>
          <NavigationItem
            icon={faSearch}
            isActive={pathname === '/search'}
            to="/search"
          >
            Search
          </NavigationItem>
          <NavigationItem
            icon={faFolderOpen}
            isActive={pathname === '/library'}
            to="/library"
          >
            Your Library
          </NavigationItem>
        </div>
      </div>
    </nav>
  );
}
