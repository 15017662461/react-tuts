import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'antd';

class Edit extends Component {
  render() {
    return (
      <Card
        title="编辑文章"
        bordered={false}
        style={{ width: '100%', height: '100%' }}
        extra={<Button>取消</Button>}
        style={{
          overflow: 'auto'
        }}
      >
      表单区域
      
      </Card>
    );
  }
}

export default Edit;
