import React, { Component, createRef } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  message
} from 'antd';
import './Edit.less';
import E from 'wangeditor';
import { getArticleById, saveArticle } from './../../requests'
import moment from 'moment';


const formItemLayout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 16
  }
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.editorRef = createRef();
    this.form = createRef();
    this.state = {
      isLoading: false,
    }
  }
  render() {
    return (
      <Card
        title="编辑文章"
        bordered={false}
        style={{ width: '100%', height: '100%',overflow: 'auto' }}
        extra={<Button onClick={this.props.history.goBack}>取消</Button>}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            ref={this.form}
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
              label="发布时间"
              style={{ zIndex: '100' }}

            >
              <DatePicker showTime placeholder="选择时间" dropdownClassName="dateDropdown" />
            </Form.Item>

            <Form.Item
              name="content"
              rules={[{ required: true, message: '内容是必填的' },]}
              label="内容"
            >
              <div className="qf-editor" ref={this.editorRef} ></div>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存修改
          </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    );
  }
  componentDidMount() {
    this.initEditor();
    this.setState({ isLoading: true });
    getArticleById(this.props.match.params.id)
      .then((resp) => {
        this.form.current.setFieldsValue({
          title: resp.title,
          author: resp.author,
          amount: resp.amount,
          content: resp.content,
          createAt: moment(resp.createAt)
        })
        this.editor.txt.html(resp.content)
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }
  componentWillUnmount() {
    this.editor.destroy();
  }
  onFinish = (values) => {
    this.setState({ isLoading:true });
    const data = Object.assign({}, values, {
      createAt: values.createAt.valueOf()
    })
    saveArticle(this.props.match.params.id, data)
      .then(resp => {
        console.log(resp)
      })
      .finally(() =>{
        this.setState({isLoading:false});
        message.success('提交成功');
        this.props.history.push('/admin/article')
      })
  }
  initEditor = () => {
    this.editor = new E(this.editorRef.current);
    this.editor.create();
    this.editor.config.onchange = (newHtml) => {
      // console.log(newHtml)
      this.form.current.setFieldsValue({
        content: newHtml
      })
    }
  }
}

export default Edit;
