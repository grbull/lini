import cn from 'classnames';
import React, { ReactElement } from 'react';

export function EpisodePanelLoading(): ReactElement {
  return (
    <div
      className={cn('w-full', 'overflow-x-auto', 'whitespace-nowrap', 'px-1')}
    >
      {[1, 2, 3, 4].map((i) => (
        <div className={cn('inline-block', 'w-1/3', 'p-1')} key={i}>
          <div
            className={cn(
              'w-full',
              'h-0',
              'relative',
              'animate-pulse',
              'bg-gray-600',
              'rounded-sm'
            )}
            style={{ paddingTop: `${(295 / 210) * 100}%` }}
          />
          <div className={cn('h-18', 'animate-pulse', 'bg-gray-800')} />
        </div>
      ))}
    </div>
  );
}
