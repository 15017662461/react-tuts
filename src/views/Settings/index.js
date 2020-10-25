import React, { Component } from 'react';

import './settings.less';

import axios from 'axios'

import { Card, Upload, Spin } from 'antd'
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      avatarUrl: ''
    }
  }
  render() {
    return (
      <Card title="个人设置" bordered={false}>
        <Upload className="qf-upload"
          showUploadList={false}
          customRequest={this.handleUploadAvatar}
        >
          <Spin spinning={this.state.isUploading}>
            {
              this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="头像"/> : <span>点击上传</span>
            }
          </Spin>
        </Upload>

      </Card>
    );
  }
  handleUploadAvatar = ({file}) =>{
    // console.log(file)
    const data = new FormData();
    data.append('Token','fd9b5e3bbbbbb904b599cbd4326b758315d3a9a1:31pUBaEQW277-RYpupHzciJbFy0=:eyJkZWFkbGluZSI6MTYwMzY0MTk0MCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzI4Nzg4IiwiYWlkIjoiMTcyNTg0MCIsImZyb20iOiJmaWxlIn0=')
    data.append('file',file);
    this.setState({ isUploading:true  });
    axios.post('http://up.imgapi.com/',data)
      .then(resp => {
        console.log(resp)
      })
  }
}

export default Settings;
