import React, { Component } from 'react';
import { Input, Select, Radio, Checkbox, DatePicker } from 'antd';
import HttpRequest from '../../../../../utils/fetch';
// 时间段选择组件
import TimeSelected from '../common/timeSelected';
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

  }

  componentDidMount () {
    // this.getPutChannels()
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

    console.log(modeTime);
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

  render () {
    const { channelsType, plainOptions, modeTime } = this.state;

    return (
      <section className="create-plan">
        <div className="create-group">
          <label className="name" htmlFor="name">广告计划名称：</label>
          <div className="input-group">
            <Input placeholder="请输入名称" />
          </div>
        </div>

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

        <div className="create-group">
          <label className="name" htmlFor="name">投放日期：</label>
          <div className="input-group">
            <RangePicker onChange={this.onChangeDate} disabledDate={this.disabledDate} />
          </div>
        </div>

        <div className="create-group">
          <label className="name" htmlFor="name">投放时间：</label>
          <div className="input-group">
            <Radio.Group onChange={this.handleModeChange} value={modeTime} style={{ marginBottom: 8 }}>
              <Radio.Button value="day">全天投放</Radio.Button>
              <Radio.Button value="time">按时间段投放</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className="create-group">
          <div className="name"></div>
          <div className="input-group">
            <TimeSelected />
          </div>
        </div>
      </section>
    )
  }
}

export default CreatePlan;