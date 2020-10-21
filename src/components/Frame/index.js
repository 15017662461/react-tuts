import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu} from 'antd';
import {withRouter} from 'react-router-dom';
// eslint-disable-next-line

import logo from './logo.png'
import './frame.less'
// eslint-disable-next-line
const { Header, Content, Sider } = Layout;


@withRouter

class Frame extends Component {
  static propTypes = {
    menus: PropTypes.array.isRequired
  }
  render() {
    const selectedKeyArr = this.props.location.pathname.split('/');
    selectedKeyArr.length = 3;
    // console.log(selectedKeyArr);
    return (
      <Layout>
        <Header className="header qf-header" >
          <div className="qf-logo">
            <img src={logo} alt="" />
          </div>
        </Header>
        <Layout>
          <Sider width={250} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[selectedKeyArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.onMenuClick}
            >
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item
                      icon={item.icon ? item.icon : null}
                      key={item.pathname}
                      style={{height:'60px',lineHeight:'60px'}}
                    >
                      {item.title}
                    </Menu.Item>)
                })
              }

            </Menu>
          </Sider>
          <Layout style={{ padding: '0 5px 5px',height:'auto' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 400,
                overflow:'auto'
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
    // console.log(this.props)
  }
}

export default Frame;
