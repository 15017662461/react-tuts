import React, { Component } from 'react';

import { adminRoutes } from './routes/index';

import { Route, Switch, Redirect } from 'react-router-dom';

import { Frame } from './components'

import {connect} from 'react-redux';


const menus = adminRoutes.filter(route => route.isNav === true)
const mapState = (state) => {
  return {
    isLogin : state.user.isLogin
  }
}

@connect(mapState)
class App extends Component {
  render() {
    return !this.props.isLogin ?  <Redirect to="/login"/> :
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return <Route
                exact={route.exact}
                path={route.pathname}
                key={route.pathname}
                render={(routeProps) => {
                  return (<route.component {...routeProps} />)
                }} />
            })
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
  }
}

export default App;



