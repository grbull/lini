import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  isActive: boolean;
  children: ReactNode;
  icon: IconDefinition;
  to: string;
}

export function NavigationItem({
  isActive,
  children,
  icon,
  to,
}: Props): ReactElement {
  return (
    <Link
      className={cn(
        'w-full',
        'h-full',
        'flex',
        'flex-col md:flex-row',
        'justify-center',
        'items-center',
        'text-sm',
        'focus:outline-none',
        'md:ml-4 md:px-2',
        'whitespace-nowrap',
        {
          'bg-gray-300 text-gray-800': isActive,
          'bg-gray-200 text-gray-600': !isActive,
          'dark:bg-gray-800 dark:text-white': isActive,
          'dark:bg-gray-800 dark:text-gray-400': !isActive,
        }
      )}
      to={to}
    >
      <FontAwesomeIcon
        className={cn('m-1', 'text-lg', 'md:mr-1')}
        icon={icon}
      />
      {children}
    </Link>
  );
}
