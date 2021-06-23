import cn from 'classnames';
import React, { ReactElement } from 'react';

export function ShowGridLoading(): ReactElement {
  return (
    <div className={cn('flex', 'flex-row', 'flex-wrap', 'px-2')}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div className={cn('w-1/3', 'p-1')} key={i}>
          <div
            className={cn(
              'w-full',
              'h-0',
              'relative',
              'animate-pulse',
              'bg-gray-600'
            )}
            style={{ paddingTop: `${(295 / 210) * 100}%` }}
          />
          <div
            className={cn(
              'w-full',
              'h-16',
              'animate-pulse',
              'bg-gray-800',
              'p-2'
            )}
          />
        </div>
      ))}
    </div>
  );
}
