import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  theme: 'dark' | 'light';
}

export function Loading({ theme }: Props): ReactElement {
  return (
    <>
      <Helmet>
        <body className={theme} />
        <title>Loading - Lini</title>
      </Helmet>
      <div
        className={cn(
          'absolute',
          'left-1/2',
          'top-1/2',
          'm-auto',
          'w-80',
          'h-96',
          '-ml-40',
          '-mt-48'
        )}
      >
        <img
          alt="logo"
          className={cn('w-28', 'mx-auto')}
          src="/android-chrome-192x192.png"
        />
        <p className={cn('text-xl', 'my-6', 'text-center')}>Loading...</p>
      </div>
    </>
  );
}
