import cn from 'classnames';
import React, { ReactElement } from 'react';

import { InfoCard } from './InfoCard';

export function EpisodeInfoLoading(): ReactElement {
  return (
    <InfoCard>
      <div className={cn('w-full', 'h-6', 'animate-pulse', 'bg-gray-700')} />
      <div className={cn('w-full', 'h-6', 'animate-pulse', 'bg-gray-700')} />
      <div
        className={cn(
          'w-full',
          'h-0',
          'relative',
          'my-3',
          'animate-pulse',
          'bg-gray-700'
        )}
        // 56% for medium
        style={{ paddingTop: '56.25%' }}
      />
      <div className={cn('w-full', 'h-16', 'animate-pulse', 'bg-gray-700')} />
    </InfoCard>
  );
}
