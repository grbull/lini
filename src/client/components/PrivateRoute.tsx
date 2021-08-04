import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { RootState } from '../redux/store';

export function PrivateRoute({ ...rest }: RouteProps): ReactElement {
  const user = useSelector((state: RootState) => state.user);

  return user.isLoggedIn ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  );
}
