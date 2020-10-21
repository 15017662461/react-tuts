import React, { Component } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  message,
  DatePicker,
} from 'antd';


const formItemLayout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 16
  }
}

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
        <Form
          {...formItemLayout}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: '阅读量是必填的' },]}
            label="标题"
          >
            <Input placeholder="标题" />
          </Form.Item>

          <Form.Item
            name="author"
            rules={[{ required: true, message: '作者是必填的' },]}
            label="作者"
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            name="amount"
            rules={[{ required: true, message: '阅读量是必填的' }, { pattern: /^\d+$/, message: '阅读量必须为数字' },]}
            label="阅读量"
          >
            <Input placeholder="0" />
          </Form.Item>

          <Form.Item
            name="createAt"
            rules={[{ required: true, message: '创建时间是必填的' },]}
            label="创建时间"
          >
            <DatePicker showTime placeholder="选择时间" />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[{ required: true, message: '内容是必填的' },]}
            label="内容"
          >
            <div placeholder="文章内容" ></div>
          </Form.Item>

          <Form.Item wrapperCol={{offset:4}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
  onFinish = (values) => {
    console.log(values)
  }
}

export default Edit;
