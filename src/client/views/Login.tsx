import cn from 'classnames';
import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { ErrorMessage } from '../components/ErrorMessage';
import { LoginForm } from '../components/LoginForm';
import { SuccessMessage } from '../components/SuccessMessage';
import { RootState } from '../redux/store';
import { api } from '../utils/api';

export function Login(): ReactElement {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

  // Need to display loading some how
  // Should we add this to user reducer
  function submitHandler(email: string): void {
    api.user
      .login({ email })
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));
  }

  const user = useSelector((state: RootState) => state.user);
  if (user.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Login - Lini</title>
      </Helmet>

      <main
        className={cn(
          'absolute',
          'left-1/2',
          'top-1/2',
          'm-auto',
          'w-80',
          'h-96',
          '-ml-40',
          '-mt-48'
        )}
      >
        <img
          alt="logo"
          className={cn('w-28', 'mx-auto')}
          src="/android-chrome-192x192.png"
        />
        <h1 className={cn('text-2xl', 'my-6', 'text-center')}>Login</h1>
        {isSuccess === undefined && <LoginForm onSubmit={submitHandler} />}
        {isSuccess === true && (
          <SuccessMessage className={cn('mb-3')}>
            Success, please check your email.
          </SuccessMessage>
        )}
        {isSuccess === false && (
          <ErrorMessage className={cn('mb-3')}>
            A link was recently issued.
          </ErrorMessage>
        )}
      </main>
    </>
  );
}
