import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function InfoCard({ children, className }: Props): ReactElement {
  return (
    <div
      className={cn(
        'm-2',
        'px-2',
        'py-2.5',
        'bg-gray-900',
        'bg-opacity-80',
        'overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

InfoCard.defaultProps = { className: undefined };
