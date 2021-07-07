import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: string | ReactNode;
  className?: string;
  illustration?: boolean;
}

export function SuccessMessage({
  children,
  className,
  illustration,
}: Props): ReactElement {
  return (
    <div
      className={cn(
        'px-2',
        'py-2.5',
        'bg-green-400',
        'bg-opacity-50',
        'border',
        'border-solid',
        'border-green-400',
        className
      )}
    >
      <div
        className={cn('flex', 'flex-col', 'items-center', 'justify-center', {
          hidden: !illustration,
        })}
      >
        <img
          alt="Happy Illustration"
          className={cn('opacity-80', 'mb-2.5')}
          src="happy.png"
          width={80}
        />
      </div>
      <h2 className={cn('font-bold')}>Success</h2>
      <p>{children}</p>
    </div>
  );
}

SuccessMessage.defaultProps = { className: undefined, illustration: false };
