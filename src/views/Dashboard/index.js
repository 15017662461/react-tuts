import React, { Component, createRef } from 'react';
import {
  Card,
  Row,
  Col,
  Spin,
} from 'antd'
import './dashboard.less'
import echarts from 'echarts';
import { getArticleAmount } from './../../requests'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.articleAmount = createRef();
    this.state = {
      options: null,
      articleChart: null,
      isLoading:true,
    }
  }
  render() {
    return (
      <>
        <Card
          title="概览"
          bordered={false}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#2986f6' }}>
                col-6
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#aba47b' }}>
                col-6
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#ff7043' }}>
                col-6
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{ backgroundColor: '#43a067' }}>
                col-6
              </div>
            </Col>
          </Row>
        </Card>
        <Card title="最近浏览量" bordered={false}>
          <Spin spinning={this.state.isLoading}>
            <div ref={this.articleAmount} style={{ height: '400px' }}>

            </div>
          </Spin>

        </Card>
      </>
    );
  }
  componentDidMount() {
    const articleChart = echarts.init(this.articleAmount.current)
    this.setState({ articleChart });
    this.initArticleChart()
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
        this.setState({ isLoading:false });
      })

  }
}

export default Dashboard;
