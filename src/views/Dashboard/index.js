import React, { Component, createRef } from 'react';
import {
  Card,
  Row,
  Col,
  Spin,
} from 'antd'
import './dashboard.less'
import echarts from 'echarts';
import { getArticleAmount, getMainAmount } from './../../requests'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.articleAmount = createRef();
    this.state = {
      options: null,
      articleChart: null,
      isCartLoading: true,
      isTopLoading: true,
      mainAmount: []
    }
  }
  render() {
    return (
      <>
        <Card
          title="概览"
          bordered={false}
        >
          <Spin spinning={this.state.isTopLoading}>
            <Row gutter={16}>
              {/* <Col className="gutter-row" span={6}>
        //   <div className="qf-gutter-box" style={{ backgroundColor: '#2986f6' }}>
        //     col-6
        //   </div>
            </Col>*/}
              {
                this.state.mainAmount.map((item, index) => {
                  return (
                    <Col className="gutter-row" span={8} key={item.title}>
                      <div className="qf-gutter-box" style={this.radomColor(index)}>
                        <Row>
                          <Col className="db-title" span={6} order={2}>{item.title}</Col>
                          <Col className="db-amount" span={18} order={1}>{item.amount}</Col>
                        </Row>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Spin>

        </Card>
        <Card title="最近浏览量" bordered={false}>
          <Spin spinning={this.state.isCartLoading}>
            <div ref={this.articleAmount} style={{ height: '400px' }}>

            </div>
          </Spin>

        </Card>
      </>
    );
  }
  componentDidMount() {
    this.getTopData();
    const articleChart = echarts.init(this.articleAmount.current)
    this.setState({ articleChart });
    this.initArticleChart()
  }

  radomColor(index) {
    const colorArr = ['#2986f6', '#ff7043', '#43a067']
    return { backgroundColor: colorArr[index] }
  }

  getTopData = () => {
    getMainAmount()
      .then(resp => {
        this.setState({ mainAmount: resp.list });
      })
      .finally(() => {
        this.setState({ isTopLoading: false });
      })
  }

  initArticleChart = () => {
    getArticleAmount()
      .then(resp => {
        // console.log(Object.values(resp.amount))
        const options = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: resp.amount.map((item) => { return item.month })
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: resp.amount.map(item => item.value),
            type: 'line',
            areaStyle: {}
          }]
        };
        this.setState({ options });
      })
      .finally(() => {
        this.state.articleChart.setOption(this.state.options)
        this.setState({ isCartLoading: false });
      })
  }
}

export default Dashboard;
