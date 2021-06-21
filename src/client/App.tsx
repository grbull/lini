import './tailwind.css';

import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { RootState } from './redux/store';
import { userActions } from './redux/user';
import { Episode } from './views/Episode';
import { Home } from './views/Home';
import { Library } from './views/Library';
import { Login } from './views/Login';
import { NotFound } from './views/NotFound';
import { Search } from './views/Search';
import { Settings } from './views/Settings';
import { Show } from './views/Show';
import { Validate } from './views/Validate';

export function App(): ReactElement {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(userActions.get());
  }, [dispatch]);

  if (user.isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Layout>
      <Switch>
        <Route component={Validate} exact path="/validate" />
        <Route component={Login} exact path="/login" />
        <PrivateRoute component={Home} exact path="/" />
        <PrivateRoute component={Show} exact path="/show/:id" />
        <PrivateRoute component={Episode} exact path="/episode/:id" />
        <PrivateRoute component={Search} exact path="/search" />
        <PrivateRoute component={Library} exact path="/library" />
        <PrivateRoute component={Settings} exact path="/settings" />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Layout>
  );
}
