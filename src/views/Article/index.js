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
      isLoading: false,
      offset: 0,
      limited: 10
    };
  }
  render() {
    return (
      <Card
        title="文章列表"
        bordered={false}
        style={{ width: '100%', height: '100%' }}
        extra={<Button onClick={this.toExcel}>导出Excel</Button>}
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
            current:this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions:['10','15','20','25','30']
          }}
        />
      </Card>
    );
  }

  toExcel = () => {
    //在实际的项目中 这个功能是前端发送一个ajax请求到后端，然后后端发送一个文件下载的地址
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
    this.setState({ isLoading: true });
    getArticles(this.state.offset, this.state.limited).then(resp => {
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
        this.setState({ isLoading: false });
      })
  }

  componentDidMount() {
    this.getData();
  }

  onPageChange = (page, pageSize) => {
    // console.log(page,pageSize)
    this.setState({
      offset: (page - 1) * pageSize,
      limited: pageSize
    }, this.getData());
  }

  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    },() => {
      this.getData()
    });
  }
}

export default ArticleList;
