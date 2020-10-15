import React, { Component } from 'react';

import { adminRoutes } from './routes/index';

import { Route, Switch, Redirect } from 'react-router-dom';

import { Frame } from './components'

class App extends Component {
  render() {
    const menus = adminRoutes.filter(route => route.isNav === true)
    return (
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

    );
  }
}

export default App;



