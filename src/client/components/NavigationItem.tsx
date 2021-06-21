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
        'flex-col',
        'justify-center',
        'items-center',
        'text-sm',
        'focus:outline-none',
        'bg-gray-800',
        {
          'text-white': isActive,
          'text-gray-400': !isActive,
        }
      )}
      to={to}
    >
      <FontAwesomeIcon className={cn('m-1', 'text-lg')} icon={icon} />
      {children}
    </Link>
  );
}
