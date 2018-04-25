import React, { Component } from 'react';
import { Tabs, Button, Select, Input, InputNumber, Radio } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AdvertProgram extends Component {
  state = {
    selectdAdvertPlan: '', // 选择的广告计划
    havePlan: '', // 选择已有的广告计划
    launchType: 1, // 投放类型（1、均匀；2、加速）
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

  // 投放类型选择
  onChangeLaunchType = (e) => {
    this.setState({
      launchType: e.target.value
    })
  }

  render () {
    const { launchType } = this.state;
    
    return (
      <section className="create-plan__group">
        <h2>广告计划</h2>

        <Tabs defaultActiveKey="1" animated={false} onChange={this.tabCallback}>
          <TabPane tab="选择已有广告计划" key="1">
            <Select 
              placeholder="选择已有广告计划" 
              style={{ width: '650px' }} 
              onChange={ this.handleChangeHavePlans }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </TabPane>

          <TabPane tab="新建广告计划" key="2">
            <h3>计划设置</h3>

            <div className="create-group">
              <label className="name" htmlFor="name">广告每日预算：</label>
              <div className="input-group">
                <InputNumber min={1} placeholder="请输入预算" />
              </div>
            </div>

            <div className="create-group">
              <label className="name" htmlFor="name">广告计划名称：</label>
              <div className="input-group">
                <Input min={1} placeholder="请输入广告计划名称" />
              </div>
            </div>

            <div className="create-group">
              <label className="name" htmlFor="name">投放控制：</label>
              <div className="input-group">
                <div className="channel-type launch-type">
                  <RadioGroup onChange={this.onChangeLaunchType} value={launchType}>
                    <Radio value={1}>均匀投放</Radio>
                    <Radio value={2}>加速投放</Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>

        <Button className="next-step">下一步</Button>
      </section>
    )
  }
}

export default AdvertProgram;