import cn from 'classnames';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { isValidEmail } from '../utils/isValidEmail';
import { ErrorMessage } from './ErrorMessage';

interface Props {
  onSubmit: (email: string) => void;
}

export function LoginForm({ onSubmit }: Props): ReactElement {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email.length === 0) {
        setIsEmailValid(undefined);
      } else if (isValidEmail(email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }, 500);

    return (): void => clearTimeout(timer);
  }, [email]);

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function clickHandler(): void {
    onSubmit(email);
  }

  return (
    <form>
      <p className={cn('mb-6')}>
        Enter your email address and you will be sent a link to login with.
      </p>
      {isEmailValid === false && (
        <ErrorMessage className={cn('mb-3')}>
          The email address is invalid.
        </ErrorMessage>
      )}
      <input
        aria-label="email-input"
        autoComplete="email"
        className={cn(
          'w-full',
          'mb-6',
          'p-2',
          'text-gray-600',
          'bg-gray-200',
          'border-2',
          'border-solid',
          {
            'border-gray-200': isEmailValid === undefined,
            'border-green-400 dark:border-green-200 ': isEmailValid === true,
            'border-red-200': isEmailValid === false,
          },
          {
            'hover:border-blue-300': isEmailValid === undefined,
            'hover:border-green-300': isEmailValid === true,
            'hover:border-red-300': isEmailValid === false,
          },
          {
            'focus:border-blue-300': isEmailValid === undefined,
            'focus:border-green-300': isEmailValid === true,
            'focus:border-red-300': isEmailValid === false,
          }
        )}
        name="email"
        onChange={changeHandler}
        placeholder="Email"
        value={email}
      />
      <div className={cn('flex', 'items-center')}>
        <button
          className={cn(
            'w-28',
            'py-2',
            'mx-auto',
            'border-2',
            'border-solid',
            'border-green-400 dark:border-green-200',
            'text-green-400 dark:text-green-200',
            'hover:border-green-500 dark:hover:border-green-300',
            'hover:text-green-500 dark:hover:text-green-300',
            'disabled:opacity-50',
            'dark:disabled:border-gray-200',
            'dark:disabled:text-gray-200',
            'disabled:cursor-not-allowed'
          )}
          disabled={!isEmailValid}
          onClick={clickHandler}
          type="button"
        >
          Request Link
        </button>
      </div>
    </form>
  );
}
