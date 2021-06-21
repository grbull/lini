import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  description: string;
  title: string;
}

export function PreferencesItem({
  children,
  description,
  title,
}: Props): ReactElement {
  return (
    <>
      <div className={cn('flex', 'flex-col')}>
        <span className={cn('font-medium')}>{title}:</span>
        <span className={cn('font-light')}>{description}</span>
      </div>
      <span>{children}</span>
    </>
  );
}
