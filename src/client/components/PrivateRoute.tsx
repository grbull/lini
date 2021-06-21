import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { RootState } from '../redux/store';

export function PrivateRoute({ ...rest }: RouteProps): ReactElement {
  const user = useSelector((state: RootState) => state.user);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return user.isLoggedIn ? <Route {...rest} /> : <Redirect to="/login" />;
}
