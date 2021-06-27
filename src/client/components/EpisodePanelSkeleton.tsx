import cn from 'classnames';
import React, { ReactElement } from 'react';

import { Skeleton } from './Skeleton';

export function EpisodePanelSkeleton(): ReactElement {
  return (
    <div
      className={cn('w-full', 'overflow-x-auto', 'whitespace-nowrap', 'px-1')}
    >
      {[1, 2, 3, 4].map((i) => (
        <div className={cn('inline-block', 'w-1/3', 'p-1')} key={i}>
          <Skeleton
            className={cn(
              'w-full',
              'h-0',
              'relative',
              'bg-gray-600',
              'rounded-sm'
            )}
            style={{ paddingTop: `${(295 / 210) * 100}%` }}
          />
          <Skeleton className={cn('h-18', 'bg-gray-800')} />
        </div>
      ))}
    </div>
  );
}
