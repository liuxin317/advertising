import React, { Component } from 'react';
import { Table, Button, Checkbox } from 'antd';
import '../timeSelected/style.scss';
import './style.scss';

class AllDay extends Component {
  state = {
    timeData: [{ // 时间段数据
      key: '1',
      name: '星期一',
      selected: false
    }, {
      key: '2',
      name: '星期二',
      selected: false
    }, {
      key: '3',
      name: '星期三',
      selected: false
    }, {
      key: '4',
      name: '星期四',
      selected: false
    }, {
      key: '5',
      name: '星期五',
      selected: false
    }, {
      key: '6',
      name: '星期六',
      selected: false
    }, {
      key: '7',
      name: '星期日',
      selected: false
    }],
    timeGroupSelect: [], // 选中的day
  }

  // 监听是否选中
  onChangeAllDay = (record, e) => {
    const { timeData } = this.state;
    let select = e.target.checked;
    let timeDatas = JSON.parse(JSON.stringify(timeData));

    timeDatas.forEach(item => {
      if (record.key === item.key) {
        item.selected = select;
      }
    })

    this.setState({
      timeData: timeDatas
    }, () => {
      this.getSelectdDay()
    })
  }

  // 表格每列render
  tableCloumnRender = (text, record) => {
    return (
      <div className="time-group">
        <span>
          <Checkbox onChange={this.onChangeAllDay.bind(this, record)} checked={ record.selected } />
        </span>
      </div>
    )
  }

  // 撤销所有的选择
  undoAllOptions = () => {
    const { timeData } = this.state;
    let timeDatas = JSON.parse(JSON.stringify(timeData));

    timeDatas.forEach(item => {
      item.selected = false;
    })

    this.setState({
      timeData: timeDatas
    }, () => {
      this.getSelectdDay()
    })
  }

  // 获取已选中的日期
  getSelectdDay = () => {
    const { timeData } = this.state;
    let timeDatas = JSON.parse(JSON.stringify(timeData));
    let timeGroupSelect = [];

    timeDatas.forEach(item => {
      let str = '';

      if (item.selected) {
        str = `${item.name}：00:00 ~ 23:59`
      }

      timeGroupSelect.push(str)
    })

    this.setState({
      timeGroupSelect
    }, () => {
      this.props.childrenGetTimeSelectedData(this.state.timeGroupSelect)
    })
  }

  render () {
    const { timeData, timeGroupSelect } = this.state;
    const columns = [{
      title: '星期 / 日期',
      dataIndex: 'name',
      width: '60%'
    }, {
      title: '全天',
      width: '40%',
      render: this.tableCloumnRender
    }];

    return (
      <section className="all-time-selected">
        <Table 
          rowKey={(record, index) => index} 
          columns={columns} 
          dataSource={timeData} 
          bordered 
          pagination={false} 
          rowClassName="no-hover" 
        />

        <div className="time-selected">
          <div className="group">
            {
              timeGroupSelect.map((item,index) => {
                return <p key={ index }>{ item }</p>
              })
            }
          </div>

          <div className="group" style={{ display: 'flex' }}>
            <Button type="primary" style={{ backgroundColor: '#f5222d' }} onClick={ this.undoAllOptions }>撤销所有选择</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default AllDay;