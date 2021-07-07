import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import { useIsOnline } from '../hooks/useIsOnline';
import { imageShow } from '../utils/imageShow';

interface Props {
  children: ReactNode;
  imageURL: string | null;
}

export function BackgroundImageShow({
  children,
  imageURL,
}: Props): ReactElement {
  const isOnline = useIsOnline();
  return (
    <div
      className={cn(
        'absolute',
        'bg-scroll',
        'bg-cover',
        'bg-center',
        'bg-scroll',
        'w-full md:max-w-4xl',
        'mx-0 md:mx-auto',
        'h-full',
        'left-0 md:left-auto',
        'top-0',
        'pt-12 md:pt-14',
        { 'pb-14 md:pb-8': isOnline },
        { 'pb-20 md:pb-14': !isOnline }
      )}
      style={{ backgroundImage: `url(${imageShow(imageURL)})` }}
    >
      <div
        className={cn(
          'w-full',
          'h-full',
          'bg-gray-100 dark:bg-gray-700',
          'bg-opacity-30 dark:bg-opacity-80',
          'overflow-y-auto'
        )}
      >
        {children}
      </div>
    </div>
  );
}
