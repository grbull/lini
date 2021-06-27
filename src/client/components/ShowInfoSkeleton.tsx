import cn from 'classnames';
import React, { ReactElement } from 'react';

import { InfoCard } from './InfoCard';
import { Skeleton } from './Skeleton';

export function ShowInfoSkeleton(): ReactElement {
  return (
    <>
      <InfoCard className={cn('my-0')}>
        <Skeleton
          className={cn('w-1/3', 'h-0', 'relative', 'float-left')}
          style={{ paddingTop: `${140 / 3}%` }}
        />
        <div className={cn('float-right', 'w-2/3', 'pl-2.5')}>
          <Skeleton className={cn('h-44')} />
        </div>
      </InfoCard>

      <InfoCard>
        <Skeleton className={cn('h-60')} />
      </InfoCard>

      <InfoCard>
        <Skeleton className={cn('h-32')} />
      </InfoCard>
    </>
  );
}
