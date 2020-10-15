//该文件模拟react-loadable插件的Loadable的作用
import React, { Component } from 'react';

const Loadable = ({
  loader,
  loading:Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent:null
    }
    componentDidMount(){
      loader().then(resp => {
        this.setState({ LoadedComponent:resp.default  });
      })
    }
    render() {
      const {LoadedComponent} = this.state;
      return (
        <div>
          {
            LoadedComponent ? <LoadedComponent /> : <Loading />
          }
        </div>
      );
    }
  }
}


export default Loadable;
