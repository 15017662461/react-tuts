import React, { Component } from 'react';
import { Card, Button,List, Avatar,Badge } from 'antd';
import {connect} from 'react-redux'; 
import {markNotificationsAsReadById,markAllNotificationsAsRead} from './../../actions/notifications'

const mapState = (state) =>{
  // const {
  //   list
  // } = state.notifications
  // return {
  //   list
  // }
  return state.notifications
}

const mapDispatch = (dispatch) => {
  return {
    markNotificationsAsReadById(id){
      const action = markNotificationsAsReadById(id);
      dispatch(action)
    },
    markAllNotificationsAsRead(){
      const action = markAllNotificationsAsRead();
      dispatch(action)
    }
  }
}

@connect(mapState,mapDispatch)
class Notifications extends Component {
  
  render() {
    console.log(this.props.lists);
    return (
      <>
        <Card title="通知中心" bordered={false} extra={<Button 
          disabled={this.props.lists.every(item => item.hasRead === true)}>全部标记为已读</Button>}
          onClick={this.props.markAllNotificationsAsRead.bind(this)}
          >
          <List
            itemLayout="horizontal"
            dataSource={this.props.lists}
            renderItem={item => (
              <List.Item 
                extra={item.hasRead ? null : <Button 
                  onClick={this.props.markNotificationsAsReadById.bind(this,item.id)}>标记为已读
                  </Button>}
              >
                <List.Item.Meta
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Card>
      </>
    );
  }
}

export default Notifications;
