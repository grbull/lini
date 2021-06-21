import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';

import { RootState } from '../redux/store';
import { userActions } from '../redux/user';

export function Validate(): ReactElement {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const { isLoading, isLoggedIn, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(userActions.validateToken({ token }));
    }
  }, [token, isLoggedIn, dispatch]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return <div>Verifying token...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return <div>Lets do this</div>;
}
