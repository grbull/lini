import cn from 'classnames';
import React, { ReactElement } from 'react';

import { InfoCard } from './InfoCard';

export function ShowInfoLoading(): ReactElement {
  return (
    <>
      <InfoCard className={cn('my-0')}>
        <div
          className={cn(
            'w-1/3',
            'h-0',
            'relative',
            'float-left',
            'animate-pulse',
            'bg-gray-700'
          )}
          style={{ paddingTop: `${140 / 3}%` }}
        />
        <div className={cn('float-right', 'w-2/3', 'pl-2.5')}>
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
          <div className={cn('h-4', 'animate-pulse', 'bg-gray-700')} />
        </div>
      </InfoCard>
      <InfoCard>
        <h2 className={cn('text-xl', 'mb-2')}>Show Info</h2>
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-1')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-4')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700', 'mb-4')} />
        <div className={cn('h-5', 'animate-pulse', 'bg-gray-700')} />
      </InfoCard>
      <InfoCard>
        <h2 className={cn('text-xl', 'mb-2')}>Episode List</h2>
        <div className={cn('h-32', 'animate-pulse', 'bg-gray-700')} />
      </InfoCard>
    </>
  );
}
