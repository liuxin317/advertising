import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Loading from './components/common/Loading';

function RouterConfig({ history, app }) {
  const Login = dynamic({
    app,
    component: () => import('./components/login'),
  });

  return (
    <Router history={history}>
      <div>
        <Loading />
        <Switch>
          <Route path="/" exact render={() => <Redirect to='/login' />}/>
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
