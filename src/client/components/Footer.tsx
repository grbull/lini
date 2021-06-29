import cn from 'classnames';
import React, { ReactElement } from 'react';

import packageJson from '../../../package.json';

export function Footer(): ReactElement {
  return (
    <div
      className={cn(
        'h-8',
        'fixed',
        'bottom-0',
        'hidden md:block',
        'w-full',
        'bg-gray-100 dark:bg-gray-600'
      )}
    >
      <div
        className={cn(
          'max-w-4xl',
          'h-full',
          'mx-auto',
          'flex',
          'items-center',
          'justify-center',
          'font-light',
          'text-sm'
        )}
      >
        <span>Lini 2021 &copy;</span>
        <span className={cn('px-4')}>•</span>
        <span>Version: {packageJson.version}</span>
        <span className={cn('px-4')}>•</span>
        <a className={cn('underline')} href="https://github.com/grbull/lini">
          Source
        </a>
      </div>
    </div>
  );
}
