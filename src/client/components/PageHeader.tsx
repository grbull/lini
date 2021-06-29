import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import { BackButton } from './BackButton';

interface Props {
  className?: string;
  goBack?: boolean;
  isLoading?: boolean;
  title: string;
  rightElement?: ReactNode;
}

export function PageHeader({
  className,
  goBack,
  isLoading,
  title,
  rightElement,
}: Props): ReactElement {
  return (
    <>
      <Helmet>
        <title>{title} - Lini</title>
      </Helmet>
      <header
        className={cn(
          'w-full',
          'h-12',
          'flex',
          'items-center',
          'p-2',
          'md:hidden',
          { 'justify-between': goBack, 'justify-center': !goBack },
          className
        )}
      >
        {goBack && <BackButton />}
        {isLoading ? (
          <div
            className={cn('w-2/3', 'h-3/4', 'animate-pulse', 'bg-gray-600')}
          />
        ) : (
          <h1
            className={cn(
              'mx-2',
              'font-medium',
              'text-lg',
              'overflow-x-auto',
              'whitespace-nowrap'
            )}
          >
            {title}
          </h1>
        )}
        {goBack && <div className={cn('w-11')}>{rightElement}</div>}
      </header>
    </>
  );
}

PageHeader.defaultProps = {
  className: undefined,
  goBack: true,
  isLoading: false,
  rightElement: undefined,
};
