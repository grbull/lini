import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

export function SettingsCard({ children, title }: Props): ReactElement {
  return (
    <div className={cn('p-2.5', 'py-3')}>
      <h2 className={cn('pb-2', 'text-lg', 'font-bold')}>{title}</h2>
      <div className={cn()}>{children}</div>
    </div>
  );
}
