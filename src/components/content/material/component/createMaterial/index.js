import React, { Component } from 'react';
import HttpRequest from '../../../../../utils/fetch';
import { Input, Select, Upload, message, Button, Icon } from 'antd';
import './style.scss';

const Option = Select.Option;

class CreateMaterial extends Component {

  state = {
    channelList: [], // 渠道列表
    selectChannelId: "", // 选择的渠道 
    advertedList: [], // 对应的广告列表
    toalAdvertedList: [], // 总广告列表
    advertedID: "", // 选择的广告ID
    fileList: [], // 上传列表
    backFileUrl: "", // 文件上传成功后返回地址 
    materialName: "", // 素材名称
    materialCopyWrit: "", // 素材文案
    materialDescribe: "", // 素材描述
    materialLand: "", // 落地页
  }

  componentDidMount() {
    this.getSelectChannelPlaces()
  }

  // 监听媒体渠道
  handleChangeMediaChannels = (value) => {
    this.setState({
      selectChannelId: value
    }, () => {
      this.channelChooseAdverted()
    })
  }

  // 获取媒体模版
  getSelectChannelPlaces = () => {
    HttpRequest("/material/selectAll", "POST", {}, res => {
      this.setState({
        channelList: res.data.ls2,
        toalAdvertedList: res.data.ls1,
        selectChannelId: res.data.ls2[0].id
      }, () =>{
        this.channelChooseAdverted()
      })
    })
  }

  // 根据当前的媒体渠道筛选广告列表
  channelChooseAdverted = () => {
    const { selectChannelId, toalAdvertedList } = this.state;
    let advertedList = [];

    toalAdvertedList.forEach(item => {
      if (Number(item.channelId) === Number(selectChannelId)) {
        advertedList.push(item)
      }
    })

    this.setState({
      advertedList,
      advertedID: advertedList.length ? advertedList[0].id : ""
    })
  }

  // 监听广告列表的选择
  handleChangeAdverted = (value) => {
    this.setState({
      advertedID: value
    })
  }

  // 上传图片返回的路径
  uploadFileResponse = (data) => {
    console.log(data)
  }

  // 监听上传图片
  uploadFileChange = (info) => {
    let backFileUrl = "";
    let response = info.file.response;
    let fileList = info.fileList;

    if (info.file.status === 'done') {
      backFileUrl = response.data
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      backFileUrl = ""
      message.error(`${info.file.name} 文件上传失败。`);
    }
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList, backFileUrl });
  }

  // 监听各个输入框的值
  changeInputs = (type, e) => {
    let obj = {};
    obj[type] = e.target.value.trim();

    this.setState({
      ...obj
    })
  }

  // 新建提交
  createSubmission = () => {
    const { materialName, materialCopyWrit, materialDescribe, materialLand, advertedID, backFileUrl } = this.state;
    const { groupId, backListView } = this.props;

    if (!materialName) {
      message.warning("素材名称不能为空！")
    } else if (!materialCopyWrit) {
      message.warning("素材文案不能为空！")
    } else if (!materialDescribe) {
      message.warning("素材描述不能为空！")
    } else if (!materialLand) {
      message.warning("落地页不能为空！")
    } else if (!advertedID) {
      message.warning("请选择广告位！")
    } else if (!backFileUrl) {
      message.warning("请上传文件！")
    } else {
      let materialService = {
        name: materialName,
        text: materialCopyWrit,
        desc: materialDescribe,
        url: materialLand,
        placeId: advertedID,
        file: backFileUrl,
        groupId
      }

      HttpRequest("/material/add", "POST", {
        material: JSON.stringify(materialService)
      }, res => {
        message.success("新建成功！")
        backListView()
      })
    }
  }

  render () {
    const { selectChannelId, channelList, advertedID, advertedList, materialName, materialCopyWrit, materialDescribe, materialLand } = this.state;
    const { backListView } = this.props;

    const props = {
      name: 'file',
      action: '/material/uploadMaterial',
      headers: {
        authorization: 'authorization-text',
      }
    };

    return (
      <section className="create-material">
        {/* 素材名称 */}
        <div className="info-group">
          <label htmlFor="" className="name"><em>*</em> 素材名称：</label>
          <div className="info-content">
            <Input placeholder="请输入素材名称" value={ materialName } onChange={ this.changeInputs.bind(this, "materialName") } />
          </div>
        </div>

        {/* 素材文案 */}
        <div className="info-group">
          <label htmlFor="" className="name"><em>*</em> 素材文案：</label>
          <div className="info-content">
            <Input placeholder="请输入素材文案" value={ materialCopyWrit } onChange={ this.changeInputs.bind(this, "materialCopyWrit") } />
          </div>
        </div>

        {/* 素材描述 */}
        <div className="info-group">
          <label htmlFor="" className="name"><em>*</em> 素材描述：</label>
          <div className="info-content">
            <Input placeholder="请输入素材描述" value={ materialDescribe } onChange={ this.changeInputs.bind(this, "materialDescribe") } />
          </div>
        </div>

        {/* 落地页 */}
        <div className="info-group">
          <label htmlFor="" className="name"><em>*</em> 落地页：</label>
          <div className="info-content">
            <Input placeholder="请输入落地页" value={ materialLand } onChange={ this.changeInputs.bind(this, "materialLand") } />
          </div>
        </div>

        {/* 媒体模版 */}
        <div className="info-group">
          <label htmlFor="" className="name"><em>*</em> 媒体模版：</label>
          <div className="info-content" style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
              <label htmlFor="" style={{ marginRight: 10 }}>媒体渠道:</label>
              <Select value={ selectChannelId } style={{ maxWidth: 400, minWidth: 120 }} onChange={this.handleChangeMediaChannels}>
                {
                  channelList.map((item, index) => {
                    return <Option key={ index } value={ item.id }>{ item.name }</Option>
                  })
                }
              </Select>

              <label htmlFor="" style={{ margin: "0 10px 0 20px" }}>广告位:</label>
              <Select value={ advertedID } style={{ maxWidth: 400, minWidth: 120 }} onChange={this.handleChangeAdverted}>
                {
                  advertedList.map((item, index) => {
                    return <Option key={ index } value={ item.id }>{ item.name }</Option>
                  })
                }
              </Select>
          </div>
        </div>

        {/* 选择文件 */}
        <div className="info-group" style={{ marginTop: 25 }}>
          <label htmlFor="" className="name"><em>*</em> 选择文件：</label>
          <div className="info-content">
            <Upload className="avatar-uploader" {...props} onChange={ this.uploadFileChange } fileList={ this.state.fileList }>
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            </Upload>
          </div>
        </div>

        {/* 确定 or 取消 */}
        <div className="info-group" style={{ marginTop: 25 }}>
          <div className="name"></div>
          <div className="info-content">
            <Button type="primary" onClick={ this.createSubmission }>确定</Button>
            <Button style={{ marginLeft: 30 }} onClick={ backListView }>取消</Button>
          </div>
        </div>
      </section>
    )
  }
}

export default CreateMaterial;