import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import { useIsOnline } from '../hooks/useIsOnline';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { OfflineBanner } from './OfflineBanner';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): ReactElement {
  const isOnline = useIsOnline();
  return (
    <>
      <main
        className={cn(
          { 'pb-14 md:pb-10': isOnline },
          { 'pb-20 md:pb-16': !isOnline },
          'pt-0 md:pt-18',
          'md:max-w-4xl',
          'mx-0 md:mx-auto'
        )}
      >
        {children}
      </main>
      <OfflineBanner />
      <Navigation />
      <Footer />
    </>
  );
}
