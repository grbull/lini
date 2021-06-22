import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import { imageShow } from '../utils/imageShow';

interface Props {
  children: ReactNode;
  imageURL?: string;
}

export function BackgroundImageShow({
  children,
  imageURL,
}: Props): ReactElement {
  return (
    <div
      className={cn(
        'absolute',
        'bg-scroll',
        'bg-cover',
        'bg-center',
        'bg-scroll',
        'w-full',
        'h-full',
        'left-0 top-0',
        'pt-12',
        'pb-14'
      )}
      style={{ backgroundImage: `url(${imageShow(imageURL)})` }}
    >
      <div
        className={cn(
          'w-full',
          'h-full',
          'bg-gray-100 dark:bg-gray-700',
          'bg-opacity-30 dark:bg-opacity-80',
          'overflow-y-scroll'
        )}
      >
        {children}
      </div>
    </div>
  );
}

BackgroundImageShow.defaultProps = { imageURL: undefined };
