import cn from 'classnames';
import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { ErrorMessage } from '../components/ErrorMessage';
import { LoginForm } from '../components/LoginForm';
import { RootState } from '../redux/store';
import { api } from '../utils/api';

export function Login(): ReactElement {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

  // Need to display loading some how

  function submitHandler(email: string): void {
    api.user
      .login({ email })
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));
  }

  const user = useSelector((state: RootState) => state.user);
  if (user.data && !user.error) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Login - Lini</title>
      </Helmet>

      <main
        className={cn(
          'h-screen',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'px-8'
        )}
      >
        <div className={cn('h-64')}>
          <h1 className={cn('text-2xl', 'mb-6', 'text-center')}>Login</h1>
          {isSuccess === undefined && <LoginForm onSubmit={submitHandler} />}
          {isSuccess === true && <div>Success, please check your email</div>}
          {isSuccess === false && (
            <ErrorMessage className={cn('mb-3')}>
              A link was recently issued.
            </ErrorMessage>
          )}
        </div>
      </main>
    </>
  );
}
