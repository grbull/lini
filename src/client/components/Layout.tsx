import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import { Footer } from './Footer';
import { Navigation } from './Navigation';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): ReactElement {
  return (
    <>
      <main
        className={cn(
          'pb-14 md:pb-10',
          'pt-0 md:pt-18',
          'md:max-w-4xl',
          'mx-0 md:mx-auto'
        )}
      >
        {children}
      </main>
      <Navigation />
      <Footer />
    </>
  );
}
