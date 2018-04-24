import React, { Component } from 'react';
import { Button, Tabs, Select, Table, Modal, message, Input, Icon } from 'antd';
import HttpRequest from '../../../utils/fetch';
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
  title: '展示',
  dataIndex: 'channelId',
}, {
  title: '点击',
  dataIndex: 'moneyType',
}, {
  title: '点击率',
  dataIndex: 'putType',
}, {
  title: 'CPC',
  dataIndex: 'userId',
}, {
  title: 'CPM',
  dataIndex: 'money1',
}, {
  title: '花费',
  dataIndex: 'money2',
}, {
  title: '操作',
  render: (text, record) => {
    return (
      <div className="operation-group">
        <Icon type="play-circle" />
      </div>
    )
  }
}, {
  title: '状态',
  dataIndex: 'money',
}, {
  title: '每日预算',
  dataIndex: 'money4',
}];

class Launch extends Component {
  state = {
    pageNum: 1,
    pageSize: 10,
    putInStatus: [{
      name: '投放中',
      id: 1
    },{
      name: '暂停中',
      id: 2
    },{
      name: '已删除',
      id: 3
    }],
    putID: '', // 投放状态ID
    planList: [], // 广告计划列表数据
    total: '', // 总共的数据条数
    batchIds: '', // 批量id集合
    visibleRemove: false, // 删除确认框
    selectedRowKeys: [], // 批量选择集合
  }

  componentDidMount () {
    this.getPlanList()
  }

  // tab切换回调
  TabCallback = (key) => {
    console.log(key);
  }

  // 监听广告计划用户下拉
  handleChangeStatus = (value) => {
    this.setState({
      putID: value
    })
  }

  // 获取广告计划列表
  getPlanList = () => {
    const { pageNum, pageSize } = this.state;

    HttpRequest("/plan/planList", "POST", {
      pageNum,
      pageSize
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

  // 获取批量ids
  getBatchDeleteIds = (selectedRowKeys, selectedRows) => {
    let batchIds = [];
    selectedRows.forEach(item => {
      batchIds.push(item.id)
    })

    this.setState({
      selectedRowKeys,
      batchIds: batchIds.join(',')
    })
  }

  // 确定删除确定框,广告计划批量删除
  okModalRemove = () => {
    const { batchIds } = this.state;
    
    HttpRequest("/plan/delPlans", "POST", {
      ids: batchIds
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

  // 返回列表视图
  backListView = () =>{
    this.setState({
      isCreate: false
    })
  }

  render () {

    const {putInStatus, planList, pageNum, pageSize, total, selectedRowKeys} = this.state;

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
      <section className="content-box launch-box">
        <div className="content-top">
          <h4>投放管理</h4>
          <div className="launch-top-button">
            <Button type="primary" onClick={ this.switchCreateStatus }>创建新广告</Button>
          </div>
        </div>

        <div className="launch-tabs">
          <Tabs defaultActiveKey="1" onChange={this.TabCallback}>
            <TabPane tab="广告计划" key="1">
              {/* <CreatePlan backListView={ this.backListView } /> */}
              <div className="plan-examine">
                <div className="operation-row">
                  <a onClick={ this.showBatchDeleteModal }>批量开启投放</a>
                  <a onClick={ this.showBatchDeleteModal }>批量暂停投放</a>
                  <a onClick={ this.showBatchDeleteModal }>批量删除</a>
                </div>

                <div className="table-box">
                  <div className="table-top">
                    <h5>详细数据</h5>

                    <div className="search-condition">
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="投放状态"
                        optionFilterProp="children"
                        onChange={this.handleChangeStatus}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {
                          putInStatus.map((item, index) => {
                            return <Option key={ index } value={ item.id }>{ item.name }</Option>
                          })
                        }
                      </Select>

                      <Input style={{ width: 200, margin: "0 15px" }} placeholder="广告计划名称或ID" onChange={ null } />

                      <Button className="search-button" type="primary" shape="circle" icon="search" onClick={ null } />
                    </div>
                  </div>

                  <Table 
                    rowKey={(record, index) => index}
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={planList} 
                    pagination={{ showQuickJumper: true, total, current: pageNum, pageSize, onChange: this.onChangePage, showTotal: total => `共 ${total} 条`}}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="广告" key="2">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>
      </section>
    )
  }
}

export default Launch;