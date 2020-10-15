import React, { Component } from 'react';

import { adminRouter } from './routes/index';

import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {
            adminRouter.map(route => {
              return <Route
                exact={route.exact}
                path={route.pathname}
                key={route.pathname}
                render={(routeProps) => {
                  return (<route.component {...routeProps} />)
                }} />
            })
          }
          <Redirect to={adminRouter[0].pathname} from="/admin" exact/>
          <Redirect to="/404" />
        </Switch>
      </div>

    );
  }
}

export default App;



