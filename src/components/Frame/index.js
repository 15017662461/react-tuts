import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { getNotificationList } from './../../actions/notifications'
import {logout} from './../../actions/user'
// eslint-disable-next-line
import logo from './logo.png'
import './frame.less'
// eslint-disable-next-line
const { Header, Content, Sider } = Layout;

const mapState = (state) =>{
  return {
    notificationsCount:state.notifications.lists.filter(item => item.hasRead===false).length,
    displayName:state.user.displayName,
    avatar:state.user.avatar
  }
}

const mapDispatch = (dispatch) => {
  return {
    getNotificationList(){
      const action = getNotificationList();
      dispatch(action);
    },
    logout(){
      const action = logout();
      dispatch(action);
    }
  }
}

@withRouter
@connect(mapState,mapDispatch)
class Frame extends Component {
  
  static propTypes = {
    menus: PropTypes.array.isRequired
  }
  render() {
    // console.log(this.props)
    const selectedKeyArr = this.props.location.pathname.split('/');
    selectedKeyArr.length = 3;
    const menu = (
      <Menu onClick={this.onDropDownMenuClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot={Boolean(this.props.notificationsCount)}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/settings">
          个人设置
        </Menu.Item>
        <Menu.Item key="/logout">
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Header className="header qf-header" >
          <div className="qf-logo">
            <img src={logo} alt="" onClick={this.clickImg} style={{cursor:'pointer'}} />
          </div>
          <Dropdown overlay={menu}>

            <div onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center',cursor:'pointer' }}>
              <Avatar src={this.props.avatar} />
              <span>欢迎您！{this.props.displayName}</span>
              <Badge count={this.props.notificationsCount} offset={[-10, -10]}>
                <DownOutlined />
              </Badge>

            </div>

          </Dropdown>
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
                      style={{ height: '60px', lineHeight: '60px' }}
                    >
                      {item.title}
                    </Menu.Item>)
                })
              }

            </Menu>
          </Sider>
          <Layout style={{ padding: '0 5px 5px', height: 'auto' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 400,
                overflow: 'auto'
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  componentDidMount(){
    this.props.getNotificationList();
  }

  clickImg = () => {
    // console.log(this.props)
    this.props.history.push('/admin')
  }

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
    // console.log(this.props)
  }

  onDropDownMenuClick = ({key}) => {
    // console.log(key)
    if(key === '/logout'){
      this.props.logout();
    }else{
      this.props.history.push(key)
    }
    
  }
}

export default Frame;
