import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'
import './login.less'

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

// const mapDispatch = dispatch => {
//   return {
//     login(userInfo){
//       const action = login(userInfo);
//       dispatch(action)
//     }
//   }
// }

@connect(mapState, { login })
class Login extends Component {
  render() {
    return (
      this.props.isLogin ? <Redirect to="/admin/dashboard" /> :
        <Card
          title="QF admin"
          className="qf-login-wrapper"
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名必须' }]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码必须' }]}
            >
              <Input
                disabled={this.props.isLoading}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              loading={this.props.isLoading}
              >
                登录
        </Button>
            </Form.Item>
          </Form>
        </Card>

    );
  }

  onFinish = (values) => {
    // console.log(values)
    this.props.login(values)
  }
}

export default Login;
