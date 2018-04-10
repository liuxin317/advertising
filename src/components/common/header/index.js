import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import './style.scss';

@connect((state) => {
  return {
    toggleMenuFun: state.app.toggleMenuFun,
    collapsed: state.app.collapsed
  }
})
class Head extends Component {
  render () {
    const { toggleMenuFun, collapsed } = this.props;

    return (
      <header>
        <menu className="menu-title">
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={ toggleMenuFun ? toggleMenuFun : null } />
          <span>菜单列表</span>
        </menu>
        <div className="user-info">
          <Icon type="user" />
          <span>欢迎！张三</span>
        </div>
      </header>
    )
  }
}

export default Head;