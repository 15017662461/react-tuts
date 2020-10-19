import React, { Component } from 'react';
import { Card, Button, Table, Tag, } from 'antd';
import moment from 'moment/moment';
import { getArticles } from './../../requests'

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}

const ButtonGroup = Button.Group;


class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading:false
    };
  }
  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        style={{ width: '100%', height: '100%' }}
        extra={<Button>导出Excel</Button>}
        style={{
          overflow: 'auto'
        }}
      >
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.id}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={{
            total: this.state.total,
            hideOnSinglePage: true
          }}
        />
      </Card>
    );
  }
  createColumns = (columnKeys) => {

    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          render: (text, record) => {
            const { amount } = record;
            return <Tag color={amount > 1000 ? 'red' : 'green'}>{record.amount}</Tag>
          },
          key: item
        }
      }
      if (item === 'createAt') {
        return {
          title: titleDisplayMap[item],
          render: (text, record) => {
            const { createAt } = record;
            return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
          },
          key: item
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return <ButtonGroup>
          <Button size="small" type="primary">编辑</Button>
          <Button size="small" type="danger">删除</Button>
        </ButtonGroup>
      }
    })
    return columns;
  }
  getData = () => {
    this.setState({ isLoading:true  });
    getArticles().then(resp => {
      const columnKeys = Object.keys(resp.list[0])
      const columns = this.createColumns(columnKeys);
      console.log(columns)
      this.setState({
        total: resp.total,
        columns,
        dataSource: resp.list,
      });
      //console.log(this.state.total)
    })
    .catch(err => {

    })
    .finally(() => {
      this.setState({ isLoading:false  });
    })
  }
  componentDidMount() {
    this.getData();
  }
}

export default ArticleList;
