import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import { Navigation } from './Navigation';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): ReactElement {
  return (
    <>
      <main className={cn('pb-14')}>{children}</main>
      <Navigation />
    </>
  );
}
