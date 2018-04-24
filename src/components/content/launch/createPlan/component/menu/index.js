import React, { Component } from 'react';
import { Menu } from 'antd';
import './style.scss';
import { Store } from '@/index';

const MenuItemGroup = Menu.ItemGroup;

class MenuBar extends Component {
  state = {
    collapsed: false
  }

  componentDidMount () {
    Store.dispatch({
      type: 'app/save',
      payload: { toggleMenuFun: this.toggleCollapsed }
    })
  }

  handleClick = (e) => {
    console.log('click ', e);
  }

  // 收缩菜单
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, () => {
      Store.dispatch({
        type: 'app/save',
        payload: { collapsed: this.state.collapsed }
      })
    });
  }

  render () {
    return (
      <nav className={ this.state.collapsed ? "menu-plan-box" : "menu-plan-box active" }>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          mode="inline"
          selectable={ false }
        >
          <MenuItemGroup key="g1" title="广告计划">
            <Menu.Item key="1">选择计划</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="广告">
            <Menu.Item key="2">落地页设置</Menu.Item>
            <Menu.Item key="3">广告版位</Menu.Item>
            <Menu.Item key="4">定向设置</Menu.Item>
            <Menu.Item key="5">排期与频次</Menu.Item>
            <Menu.Item key="6">出价设置</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g3" title="广告创意">
            <Menu.Item key="7">上传创意</Menu.Item>
          </MenuItemGroup>
        </Menu>
      </nav>
    )
  }
}

export default MenuBar;
