import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: string | ReactNode;
  className?: string;
  illustration?: boolean;
}

export function ErrorMessage({
  children,
  className,
  illustration,
}: Props): ReactElement {
  return (
    <div
      className={cn(
        'px-2',
        'py-2.5',
        'bg-red-400',
        'bg-opacity-50',
        'border',
        'border-solid',
        'border-red-400',
        className
      )}
    >
      {illustration && (
        <div
          className={cn('flex', 'flex-col', 'items-center', 'justify-center')}
        >
          <img
            alt="Frustrated Illustration"
            className={cn('opacity-80', 'mb-2.5')}
            src="frustrated.png"
            width={80}
          />
        </div>
      )}

      <h2 className={cn('font-bold')}>Error</h2>
      <p>{children}</p>
    </div>
  );
}

ErrorMessage.defaultProps = { className: undefined, illustration: false };
