import React, { Component } from 'react';
import { Table } from 'antd';
import './style.scss';

const times = {
  time0: [false, false],
  time1: [false, false],
  time2: [false, false],
  time3: [false, false],
  time4: [false, false],
  time5: [false, false],
  time6: [false, false],
  time7: [false, false],
  time8: [false, false],
  time9: [false, false],
  time10: [false, false],
  time11: [false, false],
  time12: [false, false],
  time13: [false, false],
  time14: [false, false],
  time15: [false, false],
  time16: [false, false],
  time17: [false, false],
  time18: [false, false],
  time19: [false, false],
  time20: [false, false],
  time21: [false, false],
  time22: [false, false],
  time23: [false, false]
}

class TimeSelected extends Component {
  state = {
    timeData: [{ // 时间段数据
      key: '1',
      name: '星期一',
      ...times
    }, {
      key: '2',
      name: '星期二',
      ...times
    }, {
      key: '3',
      name: '星期三',
      ...times
    }, {
      key: '4',
      name: '星期四',
      ...times
    }, {
      key: '5',
      name: '星期五',
      ...times
    }, {
      key: '6',
      name: '星期六',
      ...times
    }, {
      key: '7',
      name: '星期日',
      ...times
    }],
    startMoveOver: false, // 启动时间节点点移动事件
    moveOne: true, // 在时间节点内启动一次移动事件内部只做一次操作
  }

  componentDidMount () {
    
    document.querySelector('.time-selected').onmousemove = function (event) {
      event.preventDefault();
      window.event.returnValue = false;
    }
  }

  // 时间段选中状态(0 => 0-30， 1 => 30-1)(time => 时间段)(record => 改rowDate)
  periodTimeChooseState = (state, time, record) => {
    const { timeData } = this.state;
    let timeDatas = JSON.parse(JSON.stringify(timeData));

    timeDatas.forEach(item => {
      if (item.key === record.key) {
        // if (!item[time][state]) { // 判断当前所在的时间区间（上午下午）是否已经选中的状态（做区间选择）
        //   let currentTimeNubmer = time.split('time')[1]; // 当前选中时间点
        //   let timeStateNumbers = []; // 选中时间点以及当前点状态集合;
        //   let timeNumbers = []; // 选中时间点

        //   if (currentTimeNubmer >=0 && currentTimeNubmer <= 11) { // 上午
        //     for (let val in item) {
        //       if (val === 'time12') { // 上午截止点
        //         break;
        //       } else {
        //         if (val.indexOf('time') > -1) {
        //           let num = 0; //计算true次数 
        //           let obj = {state: []};

        //           item[val].forEach((every, index) => {
        //             if (every) {
        //               num++;
        //               obj.state.push(index)
        //             }
        //           })

        //           if (num > 0) {
        //             obj.time = val.split('time')[1]
        //             timeStateNumbers.push(obj)
        //             timeNumbers.push(obj.time)
        //           }
        //         }
        //       }
        //     }

        //     if (timeNumbers.length) { // 有选中的时间点
        //       let maxTime = Math.max(...timeNumbers), minTime = Math.min(...timeNumbers); // 计算出最小和最大值

        //       if (currentTimeNubmer > maxTime) { // 当大于最大值
        //         for (let val in item) { // 填充区间
        //           if (val === 'time12') { // 上午截止点
        //             break;
        //           } else {
        //             if (val.indexOf('time') > -1) {
        //               let numberTime = val.split('time')[1];

        //               if (Number(numberTime) > Number(maxTime) && Number(numberTime) < Number(currentTimeNubmer)) { // 当属于这个区间那么填充
        //                 item[val][0] = true
        //                 item[val][1] = true
        //               } else if (Number(numberTime) === Number(currentTimeNubmer)) { // 等于当前选中的时间点并且state为1，则填充state=0
        //                 if (state !== 0) { // 为1时填充，为0不填充
        //                   item[val][0] = true
        //                 }
        //               } else if (Number(numberTime) === Number(maxTime)) { // 如果等于最大值maxTime，我们要判断最大值的state是为1、0
        //                 // 当前最大值的状态是否为0;
        //                 let maxTimeState = false;

        //                 timeStateNumbers.forEach(d => {
        //                   if (Number(d.time) === Number(maxTime)) { // 寻找最大值的state
        //                     if (d.state.length === 1 && Number(d.state[0]) === 0) {
        //                       maxTimeState = true
        //                     }
        //                   }
        //                 })

        //                 if (maxTimeState) { // 如果为true，那么state为1的要填充
        //                   item[val][1] = true
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }

        //       console.log(item)
        //     }
        //   } else { // 下午

        //   }
        // }
        item[time][state] = !item[time][state]; // 改变当前选中状态
      }
    })

    this.setState({
      timeData: timeDatas
    })
  }

  // 时间段区间鼠标按下事件
  onmousedownTimeSlot = () => {
    this.setState({
      startMoveOver: true
    })
  }

  // 时间段区间鼠标松开事件
  onmouseupTimeSlot = () => {
    this.setState({
      startMoveOver: false
    })
  }

  // 时间段区间鼠标移动事件(record => 该节点数据)(state => 前半段or后半段)(time => 该时间节点)
  onmousemoveTimeSlot = (record, state, time, e) => {
    e.preventDefault();
    
    const { timeData, moveOne } = this.state;

    if (moveOne) {
      let timeDatas = JSON.parse(JSON.stringify(timeData));

      timeDatas.forEach(item => {
        if (item.key === record.key) {
          item[time][state] = !item[time][state]; // 改变当前选中状态
        }
      })

      this.setState({
        timeData: timeDatas,
        moveOne: false
      })
    }
  }

  // 时间段区离开事件
  onmouseoutTimeSlot = () => {
    this.setState({
      moveOne: true
    })
  }

  // 表格每列render
  tableCloumnRender = (tiems, text, record) => {
    const { startMoveOver } = this.state;

    return (
      <div className="time-group">
        <span 
          className={ record[tiems][0] ? "active" : "" } 
          onClick={ this.periodTimeChooseState.bind(this, 0, tiems, record) } 
          onMouseDown={ this.onmousedownTimeSlot } 
          onMouseUp={ this.onmouseupTimeSlot } 
          onMouseOut={ this.onmouseoutTimeSlot }
          onMouseMove={ startMoveOver ? this.onmousemoveTimeSlot.bind(this, record, 0, tiems) : null }>
        </span>

        <span 
          className={ record[tiems][1] ? "active" : "" } 
          onClick={ this.periodTimeChooseState.bind(this, 1, tiems, record) } 
          onMouseDown={ this.onmousedownTimeSlot }  
          onMouseUp={ this.onmouseupTimeSlot } 
          onMouseOut={ this.onmouseoutTimeSlot }
          onMouseMove={ startMoveOver ? this.onmousemoveTimeSlot.bind(this, record, 1, tiems) : null }>
        </span>
      </div>
    )
  }

  render () {
    const { timeData } = this.state;
    const columns = [{
      title: '星期 / 日期',
      dataIndex: 'name',
      width: '10%'
    }, {
      title: '上午',
      width: '45%',
      children: [
        {
          title: '0',
          width: '50px',
          dataIndex: 'time0',
          render: this.tableCloumnRender.bind(this, "time0")
        },
        {
          title: '1',
          width: '50px',
          dataIndex: 'time1',
          render: this.tableCloumnRender.bind(this, "time1")
        },
        {
          title: '2',
          width: '50px',
          dataIndex: 'time2',
          render: this.tableCloumnRender.bind(this, "time2")
        },
        {
          title: '3',
          width: '50px',
          dataIndex: 'time3',
          render: this.tableCloumnRender.bind(this, "time3")
        },
        {
          title: '4',
          width: '50px',
          dataIndex: 'time4',
          render: this.tableCloumnRender.bind(this, "time4")
        },
        {
          title: '5',
          width: '50px',
          dataIndex: 'time5',
          render: this.tableCloumnRender.bind(this, "time5")
        },
        {
          title: '6',
          width: '50px',
          dataIndex: 'time6',
          render: this.tableCloumnRender.bind(this, "time6")
        },
        {
          title: '7',
          width: '50px',
          dataIndex: 'time7',
          render: this.tableCloumnRender.bind(this, "time7")
        },
        {
          title: '8',
          width: '50px',
          dataIndex: 'time8',
          render: this.tableCloumnRender.bind(this, "time8")
        },
        {
          title: '9',
          width: '50px',
          dataIndex: 'time9',
          render: this.tableCloumnRender.bind(this, "time9")
        },
        {
          title: '10',
          width: '50px',
          dataIndex: 'time10',
          render: this.tableCloumnRender.bind(this, "time10")
        },
        {
          title: '11',
          width: '50px',
          dataIndex: 'time11',
          render: this.tableCloumnRender.bind(this, "time11")
        }
      ]
    }, {
      title: '下午',
      width: '45%',
      children: [
        {
          title: '12',
          width: '50px',
          dataIndex: 'time12',
          render: this.tableCloumnRender.bind(this, "time12")
        },
        {
          title: '13',
          width: '50px',
          dataIndex: 'time13',
          render: this.tableCloumnRender.bind(this, "time13")
        },
        {
          title: '14',
          width: '50px',
          dataIndex: 'time14',
          render: this.tableCloumnRender.bind(this, "time14")
        },
        {
          title: '15',
          width: '50px',
          dataIndex: 'time15',
          render: this.tableCloumnRender.bind(this, "time15")
        },
        {
          title: '16',
          width: '50px',
          dataIndex: 'time16',
          render: this.tableCloumnRender.bind(this, "time16")
        },
        {
          title: '17',
          width: '50px',
          dataIndex: 'time17',
          render: this.tableCloumnRender.bind(this, "time17")
        },
        {
          title: '18',
          width: '50px',
          dataIndex: 'time18',
          render: this.tableCloumnRender.bind(this, "time18")
        },
        {
          title: '19',
          width: '50px',
          dataIndex: 'time19',
          render: this.tableCloumnRender.bind(this, "time19")
        },
        {
          title: '20',
          width: '50px',
          dataIndex: 'time20',
          render: this.tableCloumnRender.bind(this, "time20")
        },
        {
          title: '21',
          width: '50px',
          dataIndex: 'time21',
          render: this.tableCloumnRender.bind(this, "time21")
        },
        {
          title: '22',
          width: '50px',
          dataIndex: 'time22',
          render: this.tableCloumnRender.bind(this, "time22")
        },
        {
          title: '23',
          width: '50px',
          dataIndex: 'time23',
          render: this.tableCloumnRender.bind(this, "time23")
        }
      ]
    }];

    return (
      <section className="time-selected">
        <Table 
          rowKey={(record, index) => index} 
          columns={columns} 
          dataSource={timeData} 
          bordered 
          pagination={false} 
          rowClassName="no-hover" 
        />
      </section>
    )
  }
}

export default TimeSelected;