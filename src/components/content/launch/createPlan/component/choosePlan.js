import React, { Component } from 'react';
import { Tabs, Button, Select } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ChoosePlan extends Component {
  state = {
    selectdAdvertPlan: '', // 选择的广告计划
    havePlan: '', // 选择已有的广告计划
  }

  // tabs切换
  tabCallback = (key) => {
    this.setState({
      selectdAdvertPlan: ''
    })
  }

  // 监听选择已有的广告计划
  handleChangeHavePlans = (value) => {
    this.setState({
      havePlan: value,
      selectdAdvertPlan: value
    })
  }

  render () {
    return (
      <section className="create-plan-group">
        <h3>广告计划</h3>

        <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
          <TabPane tab="选择已有广告计划" key="1">
            <Select 
              placeholder="选择已有广告计划" 
              style={{ width: '50%' }} 
              onChange={ this.handleChangeHavePlans }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </TabPane>

          <TabPane tab="新建广告计划" key="2">
            <h4>计划设置</h4>


          </TabPane>
        </Tabs>

        <Button className="next-step">下一步</Button>
      </section>
    )
  }
}

export default ChoosePlan;