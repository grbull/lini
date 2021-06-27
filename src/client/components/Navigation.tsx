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
  if (!user.data) {
    return <div />;
  }
  // When navigating to new page, scrolls to top
  window.scrollTo(0, 0);

  return (
    <nav
      className={cn(
        'h-14',
        'flex',
        'justify-around',
        'items-center',
        'overflow-hidden',
        'fixed',
        'bottom-0',
        'w-full'
      )}
    >
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
    </nav>
  );
}
