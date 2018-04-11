import React, { Component } from 'react';
import { Button, Tabs, Select, Table, Modal, message } from 'antd';
import HttpRequest from '../../../utils/fetch';
// 新建广告计划
import CreatePlan from './component/createPlan';
import './style.scss';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const columns = [{
  title: '计划名称',
  dataIndex: 'name',
}, {
  title: '计划ID',
  dataIndex: 'id',
}, {
  title: '花费',
  dataIndex: 'money',
}];

class Launch extends Component {
  state = {
    pageNum: 1,
    pageSize: 10,
    channelId: '', // 查询媒体ID
    userId: '', // 广告主id
    channels: [], // 媒体下拉列表
    users: [], // 广告主下拉列表
    planList: [], // 广告计划列表数据
    total: '', // 总共的数据条数
    planIds: '', // 广告计划列表批量删除id集合
    visibleRemove: false, // 删除确认框
    selectedRowKeys: [], // Check here to configure the default column
    isCreate: true, // 是否为创建状态
  }

  componentDidMount () {
    // this.getAnnelList()
  }

  // tab切换回调
  TabCallback = (key) => {
    console.log(key);
  }

  // 监听广告计划用户下拉
  handleChangeUser = (value) => {
    this.setState({
      userId: value,
      pageNum: 1
    }, () => {
      this.getPlanList()
    })
  }

  // 监听媒体下拉
  handleChangeChannel = (value) => {
    this.setState({
      channelId: value,
      pageNum: 1
    }, () => {
      this.getPlanList()
    })
  }

  // 获取广告计划搜索下拉
  getAnnelList = () => {
    HttpRequest("/plan/channelList", "POST", {}, res => {
      let allChannel = {
        name: "全部",
        id: ""
      };

      let allUser = {
        userName: "全部",
        id: ""
      };

      res.data.channels.unshift(allChannel);
      res.data.users.unshift(allUser);
      
      this.setState({
        channels: res.data.channels,
        users: res.data.users
      })

      this.getPlanList()
    })
  }

  // 获取广告计划列表
  getPlanList = () => {
    const { pageNum, pageSize, channelId, userId } = this.state;

    HttpRequest("/plan/planList", "POST", {
      pageNum,
      pageSize,
      channelId,
      userId
    }, res => {
      this.setState({
        planList: res.data.ls,
        total: res.data.totalNum
      })
    })
  }

  // 查询pageNum数据
  onChangePage = (number) => {
    this.setState({
      pageNum: number
    }, () => {
      this.getPlanList()
    })
  }

  // 获取批量删除ids
  getBatchDeleteIds = (selectedRowKeys, selectedRows) => {
    let planIds = [];
    selectedRows.forEach(item => {
      planIds.push(item.id)
    })

    this.setState({
      selectedRowKeys,
      planIds: planIds.join(',')
    })
  }

  // 确定删除确定框,广告计划批量删除
  okModalRemove = () => {
    const { planIds } = this.state;
    
    HttpRequest("/plan/delPlans", "POST", {
      ids: planIds
    }, res => {
      message.success("删除成功！");
      this.setState({
        visibleRemove: false,
        selectedRowKeys: []
      }, () => {
        this.getPlanList()
      })
    })
  }

  // 取消删除确定框
  cancelModalRemove = () => {
    this.setState({
      visibleRemove: false
    })
  }

  // 开启批量删除确认框
  showBatchDeleteModal = () => {
    const { planIds, visibleRemove } = this.state;
    if (!planIds) {
      message.warning('请选择删除数据！')
    } else {
      this.setState({
        visibleRemove: true
      })

      Modal.confirm({
        title: '提示：',
        content: '请确认删除吗？',
        visible: visibleRemove,
        okText: '确认',
        cancelText: '取消',
        onOk: this.okModalRemove,
        onCancel: this.cancelModalRemove
      });
    }
  }

  // 切换创建状态
  switchCreateStatus = () => {
    this.setState({
      isCreate: true
    })
  }

  render () {

    const {channels, users, planList, pageNum, pageSize, total, selectedRowKeys, isCreate} = this.state;

    // 批量表格
    const rowSelection = {
      onChange: this.getBatchDeleteIds,
      // 设置禁止操作
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
      selectedRowKeys
    };

    return (
      <section className="launch-box">
        <div className="content-top">
          <h4>投放管理</h4>
          <div className="launch-top-button">
            <Button type="primary" onClick={ this.switchCreateStatus }>创建新广告</Button>
          </div>
        </div>

        <div className="launch-tabs">
          <Tabs defaultActiveKey="1" onChange={this.TabCallback}>
            <TabPane tab="广告计划" key="1">
              {
                isCreate
                ?
                <CreatePlan />
                :
                <div className="plan-examine">
                  <div className="sreach-row">
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="广告主"
                      optionFilterProp="children"
                      onChange={this.handleChangeUser}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {
                        users.map((item, index) => {
                          return <Option key={ index } value={ item.id }>{ item.userName }</Option>
                        })
                      }
                    </Select>

                    <Select
                      showSearch
                      style={{ width: 200, marginLeft: 20 }}
                      placeholder="媒体渠道"
                      optionFilterProp="children"
                      onChange={this.handleChangeChannel}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {
                        channels.map((item, index) => {
                          return <Option key={ index } value={ item.id }>{ item.name }</Option>
                        })
                      }
                    </Select>
                  </div>

                  <div className="operation-row">
                    <a onClick={ this.showBatchDeleteModal }>批量删除</a>
                  </div>

                  <div className="table-box">
                    <h5>详细数据</h5>

                    <Table 
                      rowKey={(record, index) => index}
                      rowSelection={rowSelection} 
                      columns={columns} 
                      dataSource={planList} 
                      pagination={{ showQuickJumper: true, total, current: pageNum, pageSize, onChange: this.onChangePage, showTotal: total => `共 ${total} 条`}}
                    />
                  </div>
                </div>
              }
            </TabPane>
            <TabPane tab="广告组" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="广告" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
      </section>
    )
  }
}

export default Launch;