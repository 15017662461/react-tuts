import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb } from 'antd';
import {withRouter} from 'react-router-dom';
// eslint-disable-next-line

import logo from './logo.png'
import './frame.less'
// eslint-disable-next-line
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


@withRouter

class Frame extends Component {
  static propTypes = {
    menus: PropTypes.array.isRequired
  }
  render() {
    return (
      <Layout>
        <Header className="header qf-header" >
          <div className="qf-logo">
            <img src={logo} alt="" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={this.props.location.pathname}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.onMenuClick}
            >
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item
                      icon={item.icon ? item.icon  : null}
                      key={item.pathname}

                    >
                      {item.title}
                    </Menu.Item>)
                })
              }

            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 400,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
  onMenuClick = ({key}) => {
    this.props.history.push(key)
    console.log(this.props)
  }
}

export default Frame;
