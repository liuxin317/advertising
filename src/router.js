import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Loading from './components/common/Loading';

// 中文版
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

function RouterConfig({ history, app }) {
  const Login = dynamic({
    app,
    component: () => import('./components/login')
  });

  const Content = dynamic({
    app,
    component: () => import('./components/content')
  })

  return (
    <Router history={history}>
      <LocaleProvider locale={zh_CN}>
        <div>
          <Loading />
          <Switch>
            <Route path="/" exact render={() => <Redirect to='/login' />}/>
            <Route path="/login" component={Login} />
            <Route path="/content" component={Content} />
          </Switch>
        </div>
      </LocaleProvider>
    </Router>
  );
}

export default RouterConfig;
