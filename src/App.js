import React, { Component } from 'react';
import {
  Button
} from 'antd';

const testHOC = (WrappedComponent) => {
  return class HOCComponent extends Component{
    render(){
      return(
        <>
          <WrappedComponent></WrappedComponent>
          <div>
            这是高阶组件的信息
          </div>
        </>
      )
    }
  }
}

@testHOC

class App extends Component {
  render() {
    return (
      <div className="App">
      <Button type="primary">按钮</Button>
    </div>
    );
  }
}

export default App;



