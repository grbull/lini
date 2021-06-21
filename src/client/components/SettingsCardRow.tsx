import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function SettingsCardRow({ children }: Props): ReactElement {
  return (
    <div className={cn('flex', 'justify-between', 'items-center', 'py-1')}>
      {children}
    </div>
  );
}
