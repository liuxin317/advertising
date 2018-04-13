import React, { Component } from 'react';
import { Button, Table, Modal, Radio, Select, Input, message } from 'antd';
import HttpRequest from '../../../utils/fetch';
// 新建素材视图
import CreateMaterial from './component/createMaterial';
import './style.scss';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class Material extends Component {
    state = {
        pageNum: 1, // 页码
        pageSize: 10, // 每页的size
        total: "", // 总size
        dataSource: [], // 素材列表
        materialVisible: false, // 新建弹窗显示状态
        materialType: 1, // 选择素材组的方式（1 => 已有的素材组, 2 => 新建素材组）
        materialGroupId: "", // 已选择的素材组ID
        createMaterialGroupValue: "", // 新建素材组名称
        isCreateMaterial: false, // 是否进去新建素材视图
    }

    componentDidMount() {
        this.getMaterialList()
    }

    // 查询pageNum数据
    onChangePage = (number) => {
        this.setState({
            pageNum: number
        }, () => {
            this.getMaterialList()
        })
    }

    // 获取列表
    getMaterialList = () => {
        const { pageNum, pageSize } = this.state;
        
        HttpRequest('/material/list', "POST", {
            pageNum,
            pageSize
        }, res =>{
            this.setState({
                dataSource: res.data.ls,
                total: res.data.totalNum
            })
        })
    }

    // 新建弹窗确认操作
    handleMaterialOk = (e) => {
        const { materialType, materialGroupId, createMaterialGroupValue } = this.state;

        if (Number(materialType) === 1) { // 已有素材组
            if (!materialGroupId) { // 
                message.warning("请选择素材组！")
            } else {
                this.setState({
                    materialVisible: false,
                    isCreateMaterial: true
                })
            }
        } else { // 新建素材组
            if (!createMaterialGroupValue) {
                message.warning("请输入新建素材组名称！")
            } else {
                this.addMaterialGroup()
            }
        }
    }

    // 新建素材组接口
    addMaterialGroup = () => {
        const { createMaterialGroupValue } = this.state;
        HttpRequest("/material/addGroup", "POST", {
            materialGroup: JSON.stringify({ name: createMaterialGroupValue })
        }, res => {
            message.success("创建成功，前往新建素材！")
            this.setState({
                materialGroupId: res.data,
                isCreateMaterial: true,
                materialVisible: false
            })
        })
    }
    
    // 新建弹窗取消操作
    handleMaterialCancel = () => {
        this.setState({
            materialVisible: false,
        })
    }

    // 监听选择素材组的方式
    onChangeMaterialGroup = (e) => {
        this.setState({
            materialGroupId: "",
            createMaterialGroupValue: "",
            materialType: e.target.value,
        })
    }

    // 监听选择的素材组
    handleChangeMaterialGroup = (value) => {
        this.setState({
            materialGroupId: value
        })
    }

    // 监听新建素材组
    createMaterialGroup = (e) => {
        this.setState({
            createMaterialGroupValue: e.target.value.trim()
        })
    }

    // 打开新建素材弹窗
    openCreateMasterialModal = () => {
        this.setState({
            materialGroupId: "",
            createMaterialGroupValue: "",
            materialVisible: true,
        })
    }

    // 返回列表视图
    backListView = () => {
        this.setState({
            isCreateMaterial: false
        })
    }

    render () {
        const { dataSource, total, pageNum, pageSize, materialVisible, materialType, isCreateMaterial, materialGroupId } = this.state;
        const columns = [{
            title: '素材组名称',
                dataIndex: 'name',
            }, {
                title: '素材组ID',
                dataIndex: 'groupId',
            }, {
                title: '素材组个数',
                dataIndex: 'num',
            }, {
                title: '素材组状态',
                dataIndex: 'desc',
            }, {
                title: '查看',
                render: (text, record) => {
                    return (
                        <Button>查看</Button>
                    )
                }
        }];

        return (
            <section className="content-box material-box">
                <div className="content-top">
                    <h4>素材管理</h4>
                    <div className="launch-top-button">
                        <Button type="primary" onClick={ this.openCreateMasterialModal }>新建素材</Button>
                    </div>
                </div>

                {
                    isCreateMaterial
                    ?
                    <CreateMaterial groupId={ materialGroupId } backListView={ this.backListView } />
                    :
                    <div className="table-box">
                        <h5>素材列表</h5>

                        <Table 
                            rowKey={(record, index) => index}
                            columns={columns} 
                            dataSource={dataSource} 
                            rowClassName="text-center"
                            pagination={{ showQuickJumper: true, total, current: pageNum, pageSize, onChange: this.onChangePage, showTotal: total => `共 ${total} 条`}}
                        />
                    </div>
                }
                

                {/* 新建素材弹窗 */}
                <Modal
                    title="选择素材组"
                    visible={materialVisible}
                    onOk={this.handleMaterialOk}
                    onCancel={this.handleMaterialCancel}
                >
                    <div className="modal-box">
                        <RadioGroup onChange={this.onChangeMaterialGroup} value={materialType}>
                            <Radio value={1}>选择已有的素材组</Radio>
                            <Radio value={2}>新建素材组</Radio>
                        </RadioGroup>

                        <div className="tabs-content">
                            {
                                materialType === 1
                                ?
                                <Select placeholder="请选择" style={{ width: 246 }} onChange={this.handleChangeMaterialGroup}>
                                    {
                                        dataSource.map((item, index) => {
                                            return <Option key={ index } value={ item.id }>{ item.name }</Option>
                                        })
                                    }
                                </Select>
                                :
                                <Input style={{ width: 246 }} placeholder="新建素材组" onChange={ this.createMaterialGroup } />
                            }
                        </div>
                    </div>
                </Modal>
            </section>
        )
    }
}

export default Material;