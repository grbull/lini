import cn from 'classnames';
import React, { ReactElement } from 'react';

import { useIsOnline } from '../hooks/useIsOnline';

export function OfflineBanner(): ReactElement {
  const isOnline = useIsOnline();

  if (isOnline) {
    return <div />;
  }

  return (
    <div
      className={cn(
        'fixed',
        'bottom-14 md:bottom-8',
        'h-6',
        'w-full',
        'bg-red-500',
        'flex',
        'items-center',
        'justify-center'
      )}
    >
      You are currently offline.
    </div>
  );
}
