import React, { Component } from 'react';
import { Input, Radio, Icon, Checkbox, Row, Col, Table, Collapse } from 'antd';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const radioStyle = {
  display: 'block',
  height: '30px',
  marginBottom: '10px',
  lineHeight: '30px',
};
const dataSource = [{
  key: '1',
  advertPosition: '移动开屏',
  creativeForm: '640x1136单图（文）',
  describe: '开屏广告位'
}, {
  key: '2',
  advertPosition: '浏览器及手腾网',
  creativeForm: '640x330单图（文）',
  describe: '焦点图、悦图、视频暂停'
}, {
  key: '3',
  advertPosition: 'QQ浏览器',
  creativeForm: '640x200单图（文）',
  describe: '热门视频列表等'
}, {
  key: '4',
  advertPosition: 'QQ空间',
  creativeForm: '524x258单图（文）',
  describe: '沉浸视频流'
}, {
  key: '5',
  advertPosition: '移动Banner',
  creativeForm: '640x100微动',
  describe: 'Banner广告位'
}, {
  key: '6',
  advertPosition: 'QQ音乐',
  creativeForm: '80x80单图（文）',
  describe: 'QQ音乐歌单底部Banner'
}];
const columns = [{
  title: '广告版位',
  dataIndex: 'advertPosition',
  key: 'advertPosition',
}, {
  title: '创意形式',
  dataIndex: 'creativeForm',
  key: 'creativeForm',
  sorter: (a, b) => a.creativeForm.length - b.creativeForm.length
}, {
  title: '描述',
  dataIndex: 'describe',
  key: 'describe',
}];

class Advertising extends Component {
  state = {
    channelsType: 1, // 广告版位类型(1、PC，2、MOB)
    advertPosition: [{ // 广告版位
      name: 'PC',
      icon: 'desktop',
      id: 1,
      active: true
    }, {
      name: 'MOB',
      icon: 'mobile',
      id: 2,
      active: false
    }],
    advertedPositionValue: 1, // 广告版位渠道类型（1、通用，2、选择渠道，3、选择广告形式）
    flowType: 1, // 流量类型（1、移动WAP，2、APP）
    sexValue: 1, // 性别(1、男，2、女)
  }

  // 监听渠道类别
  onChangeChannelType = (e) => {
    this.setState({
      channelsType: e.target.value
    })
  }

  // 切换广告版位客户端
  switchAdvertPosition = (id) => {
    const { advertPosition } = this.state;
    let deepAdvertPosition = JSON.parse(JSON.stringify(advertPosition));

    deepAdvertPosition.forEach(item => {
      if (item.id === id) {
        item.active = true
      } else {
        item.active = false
      }
    })

    this.setState({
      advertPosition: deepAdvertPosition,
      channelsType: id
    })
  }

  // 监听广告版位渠道类型
  onChangeAdvertPosition = (e) => {
    this.setState({
      advertedPositionValue: e.target.value
    })
  }

  // 监听选择渠道
  onChangeChooseChannel = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  // 监听数据类型
  onChangeFlowType = (e) => {
    this.setState({
      flowType: e.target.value
    })
  }

  // 监听性别类型
  onChangeSex = (e) => {
    this.setState({
      sexValue: e.target.value
    })
  }

  // 监听年龄
  onChangeAge = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  render () {
    const { advertPosition, advertedPositionValue, channelsType, flowType, sexValue } = this.state;

    return (
      <section className="create-plan__group">
        <h2>广告</h2>

        {/* 落地页设置 */}
        <div className="column-group">
          <h3>落地页设置</h3>

          {/* 广告名称 */}
          <div className="create-group">
            <label className="name" htmlFor="name">广告名称：</label>
            <div className="input-group">
              <Input placeholder="请输入广告名称" />
            </div>
          </div>

          {/* 落地页 */}
          <div className="create-group">
            <label className="name" htmlFor="name">落地页：</label>
            <div className="input-group">
              <Input placeholder="请输入落地页链接" />
            </div>
          </div>

          {/* 展示监听 */}
          <div className="create-group">
            <label className="name" htmlFor="name">展示监听：</label>
            <div className="input-group">
              <TextArea rows={3} placeholder="最多支持填写三条，以逗号分隔" />
            </div>
          </div>

          {/* 点击监听 */}
          <div className="create-group">
            <label className="name" htmlFor="name">点击监听：</label>
            <div className="input-group">
              <TextArea rows={3} placeholder="最多支持填写三条，以逗号分隔" />
            </div>
          </div>
        </div>

        {/* 广告版位 */}
        <div className="column-group">
          <h3>广告版位</h3>
          
          <div className="adverted-position__group">
            <ul className="channel-type">
              {
                advertPosition.map(item => {
                  return <li onClick={ this.switchAdvertPosition.bind(this, item.id) } className={item.active ? "active" : ""} key={item.id}><Icon type={item.icon} /> { item.name }</li>
                })
              }
            </ul>

            <div className="adverted-position">
              <RadioGroup style={{ width: '100%' }} onChange={this.onChangeAdvertPosition} value={advertedPositionValue}>
                <Radio style={radioStyle} value={1}>通用</Radio>
                {/* 选择渠道 */}
                <Radio style={radioStyle} value={2}>选择渠道</Radio>
                <div className="choose-channel">
                  <Checkbox.Group disabled={advertedPositionValue === 2 ? false : true} style={{ width: '100%' }} onChange={this.onChangeChooseChannel}>
                    <Row>
                      <Col span={4}><Checkbox value="A">A</Checkbox></Col>
                      <Col span={4}><Checkbox value="B">B</Checkbox></Col>
                      <Col span={4}><Checkbox value="C">C</Checkbox></Col>
                      <Col span={4}><Checkbox value="D">D</Checkbox></Col>
                      <Col span={4}><Checkbox value="E">E</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                </div>

                {/* 选择广告形式 */}
                <Radio style={radioStyle} value={3}>选择广告形式</Radio>
                <div className="choose-channel">
                  <Checkbox.Group disabled={advertedPositionValue === 3 ? false : true} style={{ width: '100%' }} onChange={this.onChangeChooseChannel}>
                    <Row>
                      <Col span={24} style={{ marginBottom: '10px' }}><Checkbox value="banner">banner</Checkbox></Col>
                      {
                        channelsType === 2
                        ?
                        <Col span={24} style={{ marginBottom: '10px' }}><Checkbox value="信息流">信息流</Checkbox></Col>
                        :
                        ""
                      }
                      <Col span={4}><Checkbox value="前贴">前贴</Checkbox></Col>
                      <Col span={4}><Checkbox value="中贴">中贴</Checkbox></Col>
                      <Col span={4}><Checkbox value="后贴">后贴</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                </div>

                {/* 表格 */}
                <Table dataSource={dataSource} columns={columns} pagination={false} />
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* 定向设置 */}
        <div className="column-group">
          <h3>定向设置</h3>

          {/* 流量类型 */}
          <div className="create-group" style={{ marginLeft: 30 }}>
            <label className="name" htmlFor="name" style={{ width: 'auto' }}>流量类型：</label>
            <div className="input-group">
              <RadioGroup onChange={this.onChangeFlowType} value={flowType}>
                <Radio value={1}>移动WAP</Radio>
                <Radio value={2}>APP</Radio>
              </RadioGroup>
            </div>
          </div>
          
          <div className="create-group" style={{ marginLeft: 30 }}>
            <Collapse bordered={false} defaultActiveKey={['1','2','3']}>
              {/* 人口属性 */}
              <Panel header="人口属性" key="1">
                <div className="pop-attr">
                  {/* 性别 */}
                  <div className="create-group">
                    <label className="name" htmlFor="name" style={{ width: 'auto' }}>性别：</label>
                    <div className="input-group">
                      <RadioGroup onChange={this.onChangeSex} value={sexValue}>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* 年龄 */}
                  <div className="create-group">
                    <label className="name" htmlFor="name" style={{ width: 'auto' }}>年龄：</label>
                    <div className="input-group">
                      <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangeAge}>
                        <Row className="age-row">
                          <Col span={8}><Checkbox value="18-24岁">18-24岁</Checkbox></Col>
                          <Col span={8}><Checkbox value="25-34岁">25-34岁</Checkbox></Col>
                          <Col span={8}><Checkbox value="35-44岁">35-44岁</Checkbox></Col>
                          <Col span={8}><Checkbox value="45-54岁">45-54岁</Checkbox></Col>
                          <Col span={8}><Checkbox value="56-64岁">56-64岁</Checkbox></Col>
                          <Col span={8}><Checkbox value="64岁以上">64岁以上</Checkbox></Col>
                        </Row>
                      </Checkbox.Group>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel header="地域定向" key="2">
                <div className="pop-attr">
                    
                </div>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                789
              </Panel>
            </Collapse>
          </div>
        </div>

        <div style={{ height: 500 }}></div>
      </section>
    )
  }
}

export default Advertising;