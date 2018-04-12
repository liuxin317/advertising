import React, { Component } from 'react';
import { Input, Select, Radio, Checkbox, DatePicker, Button } from 'antd';
import HttpRequest from '../../../../../utils/fetch';
// 时间段选择组件
import TimeSelected from '../common/timeSelected';
// 全天选择组件
import AllDay from '../common/allDay';
import './style.scss';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

class CreatePlan extends Component {
  state = {
    channelsType: 1, // 渠道类型
    plainOptions: [], // 渠道集合
    modeTime: 'day', // 投放時間切換狀態
    moneyType: 1, // 预算类型（1、总预算；2、每日预算）
    periodType: 1, // 周期类别（1、自然, 2、设置）
    periodDay: 1, // 周期按时间类型
    launchType: 1, // 投放类型（1、均匀；2、加速）
  }

  componentDidMount () {
    this.getPutChannels()
  }

  // 监听设置广告计划
  setPlanHandleChange = (value) => {
    this.setState({
      moneyType: value
    })
  }

  // 监听渠道类别
  onChangeChannelType = (e) => {
    this.setState({
      channelsType: e.target.value
    }, () => {
      this.getPutChannels()
    })
  }

  // 监听选择的渠道
  onChangeChannels = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  // 监听投放日期
  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  }

  // 切换投放时间
  handleModeChange = (e) => {
    const modeTime = e.target.value;
    this.setState({ modeTime });
  }

  // 无法选择今天和今天之前的日子
	disabledDate = (current) => {
    return current && current.valueOf() < Date.now() - (24*60*60*1000);
  }

  // 获取渠道集合
  getPutChannels = () => {
    const { channelsType } = this.state;
    
    HttpRequest("/plan/putChannels", "POST", {
      type: channelsType
    }, res => {
      this.setState({
        plainOptions: res.data
      })
    })
  }

  // 获取时间段选择的数据
  childrenGetTimeSelectedData = (selectData) => {
    console.log(selectData);
  }

  //周期类别选择
  onChangePeriodType = (e) => {
    this.setState({
      periodType: e.target.value
    })
  }

  // 选择周期方式
  setPeriodHandleChange = (value) => {
    this.setState({
      periodDay: value
    })
  }

  // 投放类型选择
  onChangeLaunchType = (e) => {
    this.setState({
      launchType: e.target.value
    })
  }

  render () {
    const { channelsType, plainOptions, modeTime, periodType, launchType } = this.state;

    return (
      <section className="create-plan">
        {/* 广告计划名称 */}
        <div className="create-group">
          <label className="name" htmlFor="name">广告计划名称：</label>
          <div className="input-group">
            <Input placeholder="请输入名称" />
          </div>
        </div>

        {/* 预算 */}
        <div className="create-group">
          <div className="name">
            <Select defaultValue="1" style={{ width: 158, height: 36 }} onChange={this.setPlanHandleChange}>
              <Option value="1">广告计划总预算</Option>
              <Option value="2">广告计划每日预算</Option>
            </Select>
          </div>
          <div className="input-group">
            <Input placeholder="请输入预算" />
          </div>
        </div>

        {/* 投放渠道 */}
        <div className="create-group">
          <label className="name" htmlFor="name">投放渠道：</label>
          <div className="input-group">
            <div className="channel-type">
              <RadioGroup onChange={this.onChangeChannelType} value={channelsType}>
                <Radio value={1}>PC</Radio>
                <Radio value={2}>MOB</Radio>
              </RadioGroup>
            </div>

            <div className="channel-group">
              <CheckboxGroup onChange={this.onChangeChannels}>
                {
                  plainOptions.map((item, index) => {
                    return <Checkbox key={ index } value={ item.id }>{ item.name }</Checkbox>
                  })
                }
              </CheckboxGroup>
            </div>
          </div>
        </div>
        
        {/* 投放日期 */}
        <div className="create-group">
          <label className="name" htmlFor="name">投放日期：</label>
          <div className="input-group">
            <RangePicker onChange={this.onChangeDate} disabledDate={this.disabledDate} />
          </div>
        </div>
        
        {/* 投放时间 */}
        <div className="create-group">
          <label className="name" htmlFor="name">投放时间：</label>
          <div className="input-group">
            <Radio.Group onChange={this.handleModeChange} value={modeTime} style={{ marginBottom: 8 }}>
              <Radio.Button value="day">全天投放</Radio.Button>
              <Radio.Button value="time">按时间段投放</Radio.Button>
            </Radio.Group>
          </div>
        </div>
  
        {/* 时间对应的tabs */}
        <div className="create-group">
          <div className="name"></div>
          <div className="input-group">
            {
              modeTime === 'day'
              ?
              <AllDay childrenGetTimeSelectedData={ this.childrenGetTimeSelectedData } />
              :
              <TimeSelected childrenGetTimeSelectedData={ this.childrenGetTimeSelectedData } />
            }
          </div>
        </div>
        
        {/* 频次控制 */}
        <div className="create-group">
          <label className="name" htmlFor="name">频次控制：</label>
          <div className="input-group">
            <div className="channel-type">
              <RadioGroup onChange={this.onChangePeriodType} value={periodType}>
                <Radio value={1}>按自然周期</Radio>
                <Radio value={2}>按设置周期</Radio>
              </RadioGroup>
            </div>

            <div className="channel-group period-group">
              <div className="period-row">
                {
                  periodType === 1 
                  ?
                  <Select defaultValue="1" style={{ width: 100 }} onChange={this.setPeriodHandleChange}>
                    <Option value="1">每日</Option>
                    <Option value="2">每周</Option>
                  </Select>
                  :
                  <span>周期内</span>
                }
                <span style={{ margin: '0 10px' }}>展示</span>
                <span>≤</span>
                <Input style={{ width: 100, height: 32, margin: '0 10px' }} />
                <span>次</span>
              </div>

              <div className="period-row">
                {
                  periodType === 1 
                  ?
                  <Select defaultValue="1" style={{ width: 100 }} onChange={this.setPeriodHandleChange}>
                    <Option value="1">每日</Option>
                    <Option value="2">每周</Option>
                  </Select>
                  :
                  <span>周期内</span>
                }
                
                <span style={{ margin: '0 10px' }}>点击</span>
                <span>≤</span>
                <Input style={{ width: 100, height: 32, margin: '0 10px' }} />
                <span>次</span>
              </div>
            </div>
          </div>
        </div>

        {/* 投放控制 */}
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

        {/* 确定 or 取消 */}
        <div className="create-group">
          <div className="name"></div>
          <div className="input-group">
            <Button type="primary">确定并新建广告组</Button>
            <Button style={{ marginLeft: 30 }}>取消</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default CreatePlan;