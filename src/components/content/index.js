import React, { Component } from 'react';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { app } from '@/index';
import { connect } from 'dva';
import Head from '../common/header';
import Menu from '../common/menu';
import PlanMenu from './launch/createPlan/component/menu';
import './style.scss';

// Dashboard
const Dashboard = dynamic({
  app,
  component: () => import('./dashboard')
})

// 投放管理
const Launch = dynamic({
  app,
  component: () => import('./launch')
})

// 创建广告
const createPlan = dynamic({
  app,
  component: () => import('./launch/createPlan')
})

// 素材管理
const Material = dynamic({
  app, 
  component: () => import('./material')
})

@connect((state) => {
  return {
    leftMenuStatus: state.app.leftMenuStatus
  }
})
class Content extends Component {
  render () {
    const { match, location, leftMenuStatus } = this.props;
    
    return (
      <section className="content-box">
        <Head />
        <div className="content">
          {
            leftMenuStatus === 2 
            ?
            <PlanMenu />
            :
            <Menu />
          }
          
          {
            location.pathname === match.path
            ?
            <Redirect push to="/content/launch" />
            :
            ''
          }
          <Route path={`${ match.path }/dashboard`} component={ Dashboard } />
          <Route path={`${ match.path }/launch`} component={ Launch } />
          <Route path={`${ match.path }/create-plan`} component={ createPlan } />
          <Route path={`${ match.path }/material`} component={ Material } />
        </div>
      </section>
    )
  }
}

export default Content;