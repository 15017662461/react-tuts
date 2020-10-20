import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Tooltip,
} from 'antd';
import moment from 'moment/moment';
import { getArticles, deleteArticleById } from './../../requests'
import XLSX from 'xlsx';

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
      limited: 10,
      deleteArticleModalTitle: " ",
      isShowModal: false,
      deleteArticleConfirmLoading: false,
      deleteId: null
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
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['10', '15', '20', '25', '30']
          }}
        />
        <Modal
          title="此操作不可逆，请谨慎选择！"
          visible={this.state.isShowModal}
          onCancel={this.hideDeleteModal}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          onOk={this.deleteArticle}
        >
          {<Typography>确定要删除<span style={{ color: '#f00' }}>{this.state.deleteArticleModalTitle}</span>吗？</Typography>}
        </Modal>
      </Card>
    );
  }

  toExcel = () => {
    //在实际的项目中 这个功能是前端发送一个ajax请求到后端，然后后端发送一个文件下载的地址
    const data = [Object.keys(this.state.dataSource[0])];
    for (let i = 0; i < this.state.dataSource.length; i++) {
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
      ])

    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, `sheetjs${moment().format('YYYYMMDD')}.xlsx`)
  }

  createColumns = (columnKeys) => {
    const columns = columnKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleDisplayMap[item],
          render: (text, record) => {
            const { amount } = record;
            return (<Tooltip 
              title={amount > 1000 ? '热门' : '新兴'} 
              color={amount > 1000 ? 'red' : 'cyan'}
              overlayStyle={{fontSize:'13px'}}
              placement="right"
              >
              <Tag color={amount > 1000 ? 'red' : 'cyan'}>{record.amount}</Tag>
            </Tooltip>)
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
      render: (text, record) => {
        return <ButtonGroup>
          <Button size="small" type="primary" onClick={this.toEdit.bind(this,record)}>编辑</Button>
          <Button size="small" type="danger" onClick={this.showDeleteArticleModal.bind(this, record)}>删除</Button>
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
      // console.log(columns)
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
    }, this.getData());
  }

  showDeleteArticleModal = (record) => {
    // console.log(id,this)
    // Modal.confirm({
    //   content:<Typography>确定要删除<span style={{color:'#f00'}}>{record.title}</span>吗？</Typography>,
    //   title:'此操作不可逆，请谨慎选择！',
    //   okText:'别墨迹，赶紧删除！',
    //   cancelText:'我点错了！',
    //   onOk(){
    //     deleteArticle(record.id).then(resp => {
    //       console.log(resp)
    //     })
    //   }
    // })
    this.setState({
      isShowModal: true,
      deleteArticleModalTitle: record.title,
      deleteId: record.id
    });
  }

  hideDeleteModal = () => {
    this.setState({
      isShowModal: false,
      deleteArticleModalTitle: ''
    });
  }

  deleteArticle = () => {
    // console.log(this.state.deleteId)
    this.setState({ deleteArticleConfirmLoading: true });
    deleteArticleById(this.state.deleteId)
      .then(resp => {
        // console.log(resp)
        this.setState({ offset: 0 }, this.getData());
      }).catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.setState({
          deleteArticleConfirmLoading: false,
          isShowModal: false
        });
        message.success('成功删除了一篇文章')
      })
  }

  toEdit = (record) => {
    this.props.history.push(`/admin/article/edit/${record.id}`)
  }
}

export default ArticleList;
