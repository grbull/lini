import cn from 'classnames';
import React, { ReactElement } from 'react';

import { InfoCard } from './InfoCard';
import { Skeleton } from './Skeleton';

export function EpisodeInfoSkeleton(): ReactElement {
  return (
    <InfoCard>
      <Skeleton className={cn('w-full', 'h-12')} />
      <Skeleton
        className={cn('w-full', 'h-0', 'relative', 'my-3')}
        style={{ paddingTop: '56.25%' }}
      />
      <Skeleton className={cn('w-full', 'h-16')} />
    </InfoCard>
  );
}
