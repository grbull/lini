import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import { BackButton } from './BackButton';

interface Props {
  className?: string;
  goBack?: boolean;
  title: string;
  rightElement?: ReactNode;
}

export function PageHeader({
  className,
  goBack,
  title,
  rightElement,
}: Props): ReactElement {
  const classes = {
    header: cn('w-full', 'h-12', 'flex', 'items-center', 'p-2', className),
    title: cn(
      'mx-2',
      'font-medium',
      'text-lg',
      'overflow-x-scroll',
      'whitespace-nowrap'
    ),
  };

  if (!goBack) {
    return (
      <>
        <Helmet>
          <title>{title} - Lini</title>
        </Helmet>
        <header className={cn(classes.header, 'justify-center')}>
          <h1 className={cn(classes.title)}>{title}</h1>
        </header>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>{title} - Lini</title>
      </Helmet>
      <header className={cn(classes.header, 'justify-between')}>
        <BackButton />
        <h1 className={cn(classes.title)}>{title}</h1>
        <div className={cn('w-11')}>{rightElement}</div>
      </header>
    </>
  );
}

PageHeader.defaultProps = {
  className: undefined,
  goBack: true,
  rightElement: undefined,
};
