import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: string | ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className }: Props): ReactElement {
  return (
    <p
      className={cn(
        'w-full',
        'p-1',
        'bg-red-400',
        'bg-opacity-50',
        'border',
        'border-solid',
        'border-red-400',
        className
      )}
    >
      Error: {children}
    </p>
  );
}

ErrorMessage.defaultProps = { className: undefined };
