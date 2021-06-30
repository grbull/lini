import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';

import { RootState } from '../redux/store';
import { userActions } from '../redux/user';

export function Validate(): ReactElement {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && user.error) {
      dispatch(userActions.validateToken({ token }));
    }
  }, [token, user, dispatch]);

  if (user.data) {
    return <Redirect to="/" />;
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  if (user.status === 'loading') {
    return <div>Verifying token...</div>;
  }

  if (user.status === 'error') {
    return <div>Error {user.error}</div>;
  }

  return <div>Lets do this</div>;
}
